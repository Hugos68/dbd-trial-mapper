<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/button.svelte';
	import { supabase } from '$lib/modules/supabase/client';
	import { toast } from 'svelte-french-toast';

	const { data } = $props();

	async function leaveLobby() {
		const leaveLobbyResponse = await supabase
			.from('lobby_participant')
			.delete()
			.match({ lobby_id: data.lobby.id });
		if (leaveLobbyResponse.error) {
			toast.error(`Unable to leave lobby: ${leaveLobbyResponse.error.message}`);
			return;
		}
		await goto('/join-lobby', {
			replaceState: true,
			invalidateAll: true
		});
        toast.success('Successfully left lobby');
	}
</script>

<div class="flex h-full flex-col gap-2">
	<div class="flex justify-between">
		<p>Trial: {data.lobby.trial.name}</p>
		<img
			class="object-fit h-72 rounded-md"
			src={data.lobby.trial.image_url}
			alt={data.lobby.trial.name}
		/>
	</div>

	<Button class="mt-auto" onclick={leaveLobby}>Leave Lobby</Button>
</div>
