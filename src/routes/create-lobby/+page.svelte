<script lang="ts">
	import { valibot } from 'sveltekit-superforms/adapters';
	import Button from '$lib/components/button.svelte';
	import { supabase } from '$lib/modules/supabase/client.js';
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
					description: insertLobbyResponse.error.details,
				});
				return;
			}
			toaster.success({
				title: 'Successfully created lobby',
			});
		},
	});
</script>

<form class="grid h-full gap-4" method="post" autocomplete="off" use:enhance>
	<Button class="mt-auto ml-auto" disabled={$submitting}>Create Lobby</Button>
</form>
