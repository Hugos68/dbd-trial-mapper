<script lang="ts">
	import { setError, superForm } from 'sveltekit-superforms';
	import { valibot } from 'sveltekit-superforms/adapters';
	import { JoinLobbySchema } from './join-lobby-schema.js';
	import Button from '$lib/components/button.svelte';
	import { supabase } from '$lib/modules/supabase/client.js';
	import { goto } from '$app/navigation';

	const { data } = $props();

	const { form, constraints, errors, enhance, submitting } = superForm(data.form, {
		validators: valibot(JoinLobbySchema),
		SPA: true,
		async onUpdate(event) {
            const joinLobbyResponse = await supabase.from('lobby_participant').insert({
                lobby_id: event.form.data['lobby-id']
            });
            if (joinLobbyResponse.error) {
                setError(event.form, 'lobby-id', joinLobbyResponse.error.message);
                return;
            }
            await goto('/lobby', {
                replaceState: true,
                invalidateAll: true
            });
		}
	});
</script>

<form class="grid gap-4" method="post" use:enhance>
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
			<span class="text-sm text-red-500">{$errors['lobby-id']}</span>
		{/if}
	</label>
	<Button disabled={$submitting}>
		Join Lobby
	</Button>
</form>
