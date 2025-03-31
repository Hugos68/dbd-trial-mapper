<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { valibot } from 'sveltekit-superforms/adapters';
	import Button from '$lib/components/button.svelte';
	import { supabase } from '$lib/modules/supabase/client.js';
	import { goto } from '$app/navigation';
	import { CreateLobbySchema } from '../../lib/modules/schemas/create-lobby-schema.js';
	import { toaster } from '$lib/modules/ui/toaster.js';
	import { useForm } from '$lib/modules/hooks/use-form.js';

	const { data } = $props();

	const { enhance, submitting } = useForm(data.form, {
		validators: valibot(CreateLobbySchema),
		async onUpdate(event) {
			if (!event.form.valid) {
				return;
			}
			const insertLobbyResponse = await supabase.from('lobby').insert({});
			if (insertLobbyResponse.error) {
				event.form.valid = false;
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

<form class="grid h-full gap-4" method="post" use:enhance>
	<Button class="mt-auto ml-auto" disabled={$submitting}>Create Lobby</Button>
</form>
