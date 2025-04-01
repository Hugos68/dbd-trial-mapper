<script lang="ts">
	import Button from '$lib/components/button.svelte';
	import { supabase } from '$lib/modules/supabase/client.js';
	import { toaster } from '$lib/modules/ui/toaster.js';
	import Layout from '$lib/components/layout.svelte';
	import { goto } from '$app/navigation';

	async function createLobby() {
		const insertLobbyResponse = await supabase.from('lobby').insert({});
		if (insertLobbyResponse.error) {
			toaster.error({
				title: 'Failed to create lobby',
				description: insertLobbyResponse.error.details,
			});
			return;
		}
		toaster.success({
			title: 'Successfully created lobby',
		});
		await goto('/lobby', {
			replaceState: true,
		});
	}
</script>

<Layout title="Create Lobby">
	<div class="flex h-full flex-col">
		<Button class="mt-auto ml-auto" onclick={createLobby}>Create Lobby</Button>
	</div>
</Layout>
