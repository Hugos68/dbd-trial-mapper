<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { valibot } from 'sveltekit-superforms/adapters';
	import Button from '$lib/components/button.svelte';
	import { supabase } from '$lib/modules/supabase/client.js';
	import { goto } from '$app/navigation';
	import { CreateLobbySchema } from './create-lobby-schema.js';
	import { toaster } from '$lib/modules/ui/toaster.js';

	const { data } = $props();

	const { enhance, submitting } = superForm(data.form, {
		validators: valibot(CreateLobbySchema),
		SPA: true,
		async onUpdate() {
			const insertLobbyResponse = await supabase.from('lobby').insert({});
			if (insertLobbyResponse.error) {
				toaster.error({
					title: 'Failed to create lobby',
					description: insertLobbyResponse.error.message
				});
				return;
			}
			await goto('/lobby', {
				replaceState: true,
				invalidateAll: true
			});
			toaster.success({
				title: 'Successfully created lobby',
				description: 'You have been redirected to the lobby page'
			});
		}
	});
</script>

<form class="grid gap-4" method="post" use:enhance>
	<Button disabled={$submitting}>Create Lobby</Button>
</form>
