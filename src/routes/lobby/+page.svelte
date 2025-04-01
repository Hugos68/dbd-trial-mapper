<script lang="ts">
	import Button from '$lib/components/button.svelte';
	import { supabase } from '$lib/modules/supabase/client';
	import { toaster } from '$lib/modules/ui/toaster.js';
	import { copyToClipboard } from '$lib/modules/ui/copy-to-clipboard.js';
	import { overlaySettings } from '$lib/modules/ui/overlay-settings.js';
	import Layout from '$lib/components/layout.svelte';
	import { page } from '$app/state';

	const { data } = $props();

	async function copyLobbyId() {
		await copyToClipboard(data.lobby.id);
		toaster.info({
			title: 'Lobby ID copied to clipboard',
		});
	}

	async function leaveLobby() {
		const leaveLobbyResponse = await supabase
			.from('lobby_member')
			.delete()
			.match({
				lobby_id: data.lobby.id,
				user_id: page.data.user.id,
			});
		if (leaveLobbyResponse.error) {
			toaster.error({
				title: 'Failed to leave lobby',
				description: leaveLobbyResponse.error.details,
			});
			return;
		}
		toaster.success({
			title: 'Successfully left lobby',
		});
	}
</script>

<Layout title="Lobby">
	<div class="flex h-full flex-col gap-4">
		<div class="flex items-start justify-between">
			<div>
				<button class="text-start hover:underline" onclick={copyLobbyId}
					>ID: {data.lobby.id}</button
				>
				<p>Realm: {data.lobby.trial.realm.name}</p>
				<p>Trial: {data.lobby.trial.name}</p>
			</div>
			<button
				class="transition-opacity"
				class:opacity-50={overlaySettings.current.visible}
				onclick={() =>
					(overlaySettings.current.visible = !overlaySettings.current.visible)}
			>
				<img
					class:border-dashed={overlaySettings.current.visible}
					class="object-fit max-h-72 rounded-md border"
					src={data.lobby.trial.image_url}
					alt={data.lobby.trial.name}
				/>
			</button>
		</div>
		<Button class="mt-auto ml-auto" onclick={leaveLobby}>Leave Lobby</Button>
	</div>
</Layout>
