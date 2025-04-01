<script lang="ts">
	import Button from '$lib/components/button.svelte';
	import { supabase } from '$lib/modules/supabase/client';
	import { valibot } from 'sveltekit-superforms/adapters';
	import { toaster } from '$lib/modules/ui/toaster.js';
	import { LeaveLobbySchema } from '$lib/modules/schemas/leave-lobby-schema.js';
	import { useForm } from '$lib/modules/hooks/use-form.js';
	import { copyToClipboard } from '$lib/modules/ui/copy-to-clipboard.js';
	import Layout from '$lib/components/layout.svelte';
	import { overlaySettings } from '$lib/modules/ui/overlay-settings.js';
	import { WebviewWindow } from '@tauri-apps/api/webviewWindow';
	import { CurrentLobby } from '$lib/modules/context/current-lobby.js';

	const { data } = $props();

	const lobby = CurrentLobby.get();

	const { enhance, submitting } = useForm(data.leaveLobbyForm, {
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
		await copyToClipboard(data.lobby.id);
		toaster.info({
			title: 'Lobby ID copied to clipboard',
		});
	}

	function toggleOverlay() {
		overlaySettings.current.visible = !overlaySettings.current.visible;
	}
</script>

{#if lobby.current}
	<Layout title="Current Lobby">
		<div class="flex h-full flex-col gap-2">
			<div class="flex items-start justify-between">
				<div>
					<button class="text-start hover:underline" onclick={copyLobbyId}
						>ID: {lobby.current.id}</button
					>
					<p>Realm: {lobby.current.trial.realm.name}</p>
					<p>Trial: {lobby.current.trial.name}</p>
				</div>
				<button
					class="transition-opacity"
					class:opacity-50={overlaySettings.current.visible}
					onclick={toggleOverlay}
				>
					<img
						class:border-dashed={overlaySettings.current.visible}
						class="object-fit max-h-72 rounded-md border"
						src={lobby.current.trial.image_url}
						alt={lobby.current.trial.name}
					/>
				</button>
			</div>
			<form class="contents" method="post" autocomplete="off" use:enhance>
				<Button class="mt-auto ml-auto" disabled={$submitting}
					>Leave Lobby</Button
				>
			</form>
		</div>
	</Layout>
{/if}
