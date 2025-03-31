<script lang="ts">
	import Button from '$lib/components/button.svelte';
	import { supabase } from '$lib/modules/supabase/client';
	import { valibot } from 'sveltekit-superforms/adapters';
	import { toaster } from '$lib/modules/ui/toaster.js';
	import { LeaveLobbySchema } from '$lib/modules/schemas/leave-lobby-schema.js';
	import { useForm } from '$lib/modules/hooks/use-form.js';
	import { copyToClipboard } from '$lib/modules/ui/copy-to-clipboard.js';
	import Layout from '$lib/components/layout.svelte';
	import { useRealtimeRecord } from '$lib/modules/hooks/use-realtime-record.svelte.js';
	import { overlaySettings } from '$lib/modules/ui/overlay-settings.js';
	import { WebviewWindow } from '@tauri-apps/api/webviewWindow';

	const { data } = $props();

	const lobby = $derived(
		useRealtimeRecord({
			record: data.lobby,
			table: "lobby",
			async transformPayload(data) {
				const lobbyResponse = await supabase
					.from("lobby")
					.select("*, trial (*, realm (*))")
					.eq("id", data.id)
					.single();
				if (lobbyResponse.error) {
					throw new Error(lobbyResponse.error.message);
				}
				return lobbyResponse.data;
			},
		}),
	);

	const { form, enhance, submitting } = useForm(data.form, {
		validators: valibot(LeaveLobbySchema),
		async onUpdate(event) {
			if (!event.form.valid) {
				return;
			}
			const leaveLobbyResponse = await supabase
				.from('lobby_member')
				.delete()
				.match({
					lobby_id: event.form.data.lobby_id,
					user_id: event.form.data.user_id,
				});
			if (leaveLobbyResponse.error) {
				event.form.valid = false;
				toaster.error({
					title: 'Failed to leave lobby',
					description: leaveLobbyResponse.error.details,
				});
				return;
			}
			toaster.success({
				title: 'Successfully left lobby',
			});
			const overlay = await WebviewWindow.getByLabel('overlay');
			if (overlay) {
				await overlay.hide();
			}
		},
	});

	async function copyLobbyId() {
		await copyToClipboard(lobby.current.id);
		toaster.info({
			title: 'Lobby ID copied to clipboard',
		});
	}
</script>

<Layout title="My Lobby" description="The current lobby you're a member of.">
	<div class="flex h-full flex-col gap-2">
		<div class="flex justify-between">
			<div>
				<button class="hover:underline" onclick={copyLobbyId}>ID: {lobby.current.id}</button>
				<p>Realm: {lobby.current.trial.realm.name}</p>
				<p>Trial: {lobby.current.trial.name}</p>
				<Button onclick={() => overlaySettings.current.visible = !overlaySettings.current.visible}>Toggle Overlay</Button>
			</div>
			<img
				class="object-fit rounded-md"
				src={lobby.current.trial.image_url}
				alt={lobby.current.trial.name}
				width={overlaySettings.current.width}
			/>
		</div>
		<form class="contents" method="post" autocomplete="off" use:enhance>
			<input type="hidden" bind:value={$form.lobby_id} />
			<input type="hidden" bind:value={$form.user_id} />
			<Button class="mt-auto ml-auto" disabled={$submitting}>Leave Lobby</Button>
		</form>
	</div>
</Layout>

