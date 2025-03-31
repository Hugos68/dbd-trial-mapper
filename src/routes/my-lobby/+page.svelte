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
	import { emit } from '@tauri-apps/api/event';

	const { data } = $props();

	let lobby = $derived(data.lobby);

	$effect(() => {
		if (!data.lobby) {
			return;
		}
		const channel = supabase
			.channel('lobby')
			.on(
				'postgres_changes',
				{
					event: 'UPDATE',
					schema: 'public',
					table: 'lobby',
					filter: `id=eq.${data.lobby.id}`,
				},
				async (payload) => {
					const lobbyResponse = await supabase
						.from('lobby')
						.select('*, trial (*, realm (*))')
						.eq('id', payload.new.id)
						.single();
					if (lobbyResponse.error) {
						return;
					}
					lobby = lobbyResponse.data;
				},
			)
			.subscribe();
		return () => {
			channel.unsubscribe();
		};
	});

	// @ts-expect-error
	$effect(async () => {
		await emit('trial:update', lobby.trial.image_url);
	});

	// @ts-expect-error
	$effect(async () => {
		if (overlaySettings.current.visible) {
			const overlay = await WebviewWindow.getByLabel('overlay');
			if (overlay) {
				await overlay.show();
			}
		} else {
			const overlay = await WebviewWindow.getByLabel('overlay');
			if (overlay) {
				await overlay.hide();
			}
		}
	});

	$effect(() => {
		return async () => {
			const overlay = await WebviewWindow.getByLabel('overlay');
			if (overlay) {
				await overlay.hide();
			}
		};
	});

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
		await copyToClipboard(data.lobby.id);
		toaster.info({
			title: 'Lobby ID copied to clipboard',
		});
	}
</script>

<Layout title="My Lobby" description="The current lobby you're a member of.">
	<div class="flex h-full flex-col gap-2">
		<div class="flex justify-between">
			<div>
				<button class="hover:underline" onclick={copyLobbyId}
					>ID: {lobby.id}</button
				>
				<p>Realm: {lobby.trial.realm.name}</p>
				<p>Trial: {lobby.trial.name}</p>
				<Button
					onclick={() =>
						(overlaySettings.current.visible =
							!overlaySettings.current.visible)}>Toggle Overlay</Button
				>
			</div>
			<img
				class="object-fit rounded-md"
				src={lobby.trial.image_url}
				alt={lobby.trial.name}
				width={overlaySettings.current.width}
			/>
		</div>
		<form class="contents" method="post" autocomplete="off" use:enhance>
			<input type="hidden" bind:value={$form.lobby_id} />
			<input type="hidden" bind:value={$form.user_id} />
			<Button class="mt-auto ml-auto" disabled={$submitting}>Leave Lobby</Button
			>
		</form>
	</div>
</Layout>
