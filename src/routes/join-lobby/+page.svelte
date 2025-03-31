<script lang="ts">
	import { setError } from 'sveltekit-superforms';
	import { valibot } from 'sveltekit-superforms/adapters';
	import Button from '$lib/components/button.svelte';
	import { supabase } from '$lib/modules/supabase/client.js';
	import { goto } from '$app/navigation';
	import { toaster } from '$lib/modules/ui/toaster.js';
	import { JoinLobbySchema } from '$lib/modules/schemas/join-lobby-schema.js';
	import { useForm } from '$lib/modules/hooks/use-form.js';

	const { data } = $props();

	const { form, constraints, errors, enhance, submitting } = useForm(data.form, {
		validators: valibot(JoinLobbySchema),
		async onUpdate(event) {
			if (!event.form.valid) {
				return;
			}
			const joinLobbyResponse = await supabase.from('lobby_participant').insert({
				lobby_id: event.form.data['lobby-id']
			});
			if (joinLobbyResponse.error) {
				event.form.valid = false;
				toaster.error({
					title: 'Failed to join lobby',
					description: joinLobbyResponse.error.message
				});
				return;
			}
			await goto('/lobby', {
				replaceState: true,
				invalidateAll: true
			});
			toaster.success({
				title: 'Successfully joined lobby',
				description: 'You have been redirected to the lobby page'
			});
		}
	});
</script>

<form class="flex h-full flex-col gap-4" method="post" use:enhance>
	<label class="grid gap-1">
		<span class="text-sm">Lobby ID</span>
		<input
			name="lobby-id"
			class="rounded bg-transparent"
			placeholder="Lobby ID"
			bind:value={$form['lobby-id']}
			{...$constraints['lobby-id']}
		/>
		{#if $errors['lobby-id']}
			<span class="text-sm text-red-500">{$errors['lobby-id'].join(', ')}</span>
		{/if}
	</label>
	<Button class="mt-auto ml-auto" disabled={$submitting}>Join Lobby</Button>
</form>
