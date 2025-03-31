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
	import { ExternalLinkIcon, XIcon } from '@lucide/svelte';

	const { data } = $props();

	let lobby = $derived(data.lobby);

	const { form, enhance, submitting } = useForm(data.leaveLobbyForm, {
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

	// @ts-expect-error - this is fine
	$effect(async () => {
		await emit('lobby:update', lobby);
	});

	// @ts-expect-error - this is fine
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
</script>

<Layout title="My Lobby">
	<div class="flex h-full flex-col gap-2">
		<div class="flex items-start justify-between">
			<div>
				<button class="text-start hover:underline" onclick={copyLobbyId}
					>ID: {lobby.id}</button
				>
				<p>Realm: {lobby.trial.realm.name}</p>
				<p>Trial: {lobby.trial.name}</p>
			</div>
			<button
				class="group relative"
				onclick={() =>
					(overlaySettings.current.visible = !overlaySettings.current.visible)}
			>
				<div
					class="absolute top-1/2 left-1/2 z-50 -translate-1/2 opacity-0 transition-opacity group-hover:opacity-100"
				>
					<Button class="flex gap-2">
						{#if overlaySettings.current.visible}
							Pop-in <XIcon />
						{:else}
							Pop-out <ExternalLinkIcon />
						{/if}
					</Button>
				</div>
				<img
					class="object-fit max-h-72 rounded-md border transition-opacity {overlaySettings
						.current.visible
						? 'border-dashed opacity-25'
						: ''}"
					src={lobby.trial.image_url}
					alt={lobby.trial.name}
				/>
			</button>
		</div>
		<form class="contents" method="post" autocomplete="off" use:enhance>
			<input type="hidden" bind:value={$form.lobby_id} />
			<input type="hidden" bind:value={$form.user_id} />
			<Button class="mt-auto ml-auto" disabled={$submitting}>Leave Lobby</Button
			>
		</form>
	</div>
</Layout>
