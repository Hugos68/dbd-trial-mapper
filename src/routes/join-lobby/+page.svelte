<script lang="ts">
	import { valibot } from 'sveltekit-superforms/adapters';
	import Button from '$lib/components/button.svelte';
	import { supabase } from '$lib/modules/supabase/client.js';
	import { toaster } from '$lib/modules/ui/toaster.js';
	import { JoinLobbySchema } from '$lib/modules/schemas/join-lobby-schema.js';
	import { useForm } from '$lib/modules/hooks/use-form.js';

	const { data } = $props();

	const { form, errors, enhance, submitting } = useForm(data.form, {
		validators: valibot(JoinLobbySchema),
		async onUpdate(event) {
			if (!event.form.valid) {
				return;
			}
			const joinLobbyResponse = await supabase.from('lobby_member').insert({
				lobby_id: event.form.data['lobby-id'],
			});
			if (joinLobbyResponse.error) {
				event.form.valid = false;
				toaster.error({
					title: 'Failed to join lobby',
					description: joinLobbyResponse.error.details,
				});
				return;
			}
			toaster.success({
				title: 'Successfully joined lobby',
			});
		},
	});
</script>

<form
	class="flex h-full flex-col gap-4"
	method="post"
	autocomplete="off"
	use:enhance
>
	<label class="grid gap-1">
		<span class="text-sm">Lobby ID</span>
		<input
			name="lobby-id"
			class="rounded bg-transparent focus:aria-[invalid=true]:ring-red-500"
			placeholder="Lobby ID"
			bind:value={$form['lobby-id']}
		/>
		{#if $errors['lobby-id']}
			<span class="text-sm text-red-500">{$errors['lobby-id'].join(', ')}</span>
		{/if}
	</label>
	<Button class="mt-auto ml-auto" disabled={$submitting}>Join Lobby</Button>
</form>
