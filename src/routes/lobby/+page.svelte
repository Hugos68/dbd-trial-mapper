<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/button.svelte';
	import { supabase } from '$lib/modules/supabase/client';
	import { valibot } from 'sveltekit-superforms/adapters';
	import { LeaveLobbySchema } from './leave-lobby-schema.js';
	import { superForm } from 'sveltekit-superforms';
	import { toaster } from '$lib/modules/ui/toaster.js';

	const { data } = $props();

	const { form, enhance, submitting } = superForm(data.form, {
		validators: valibot(LeaveLobbySchema),
		SPA: true,
		async onUpdate(event) {
			const leaveLobbyResponse = await supabase.from('lobby_participant').delete().match({
				lobby_id: event.form.data['lobby-id'],
				user_id: event.form.data['user-id']
			});
			if (leaveLobbyResponse.error) {
				toaster.error({
					title: 'Failed to leave lobby',
					description: leaveLobbyResponse.error.message
				});
				return;
			}
			await goto('/', {
				replaceState: true,
				invalidateAll: true
			});
			toaster.success({
				title: 'Successfully left lobby',
				description: 'You have been redirected to the home page'
			});
		}
	});
</script>

<div class="flex h-full flex-col gap-2">
	<div class="flex justify-between">
		<div>
			<p>ID: <span class="select-all">{data.lobby.id}</span></p>
			<p>Trial: {data.lobby.trial.name}</p>
		</div>
		<img
			class="object-fit h-72 rounded-md"
			src={data.lobby.trial.image_url}
			alt={data.lobby.trial.name}
		/>
	</div>
	<form class="contents" method="post" use:enhance>
		<input type="hidden" name="lobby-id" bind:value={$form['lobby-id']} />
		<input type="hidden" name="user-id" bind:value={$form['lobby-id']} />
		<Button class="mt-auto" disabled={$submitting}>Leave Lobby</Button>
	</form>
</div>
