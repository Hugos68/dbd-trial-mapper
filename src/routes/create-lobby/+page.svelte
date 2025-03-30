<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { valibot } from 'sveltekit-superforms/adapters';
	import Button from '$lib/components/button.svelte';
	import { supabase } from '$lib/modules/supabase/client.js';
	import { goto } from '$app/navigation';
	import { toast } from 'svelte-french-toast';
	import { CreateLobbySchema } from './create-lobby-schema.js';

	const { data } = $props();

	const { enhance, submitting } = superForm(data.form, {
		validators: valibot(CreateLobbySchema),
		SPA: true,
		async onUpdate() {
			const insertLobbyResponse = await supabase.from('lobby').insert({});
			if (insertLobbyResponse.error) {
				toast.error(`Failed to create lobby: ${insertLobbyResponse.error.message}`);
				return;
			}
			await goto('/lobby', {
				replaceState: true,
				invalidateAll: true
			});
			toast.success('Successfully created lobby');
		}
	});
</script>

<form class="grid gap-4" method="post" use:enhance>
	<Button disabled={$submitting}>Create Lobby</Button>
</form>
