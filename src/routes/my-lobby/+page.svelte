<script lang="ts">
	import Button from '$lib/components/button.svelte';
	import { supabase } from '$lib/modules/supabase/client';
	import { valibot } from 'sveltekit-superforms/adapters';
	import { toaster } from '$lib/modules/ui/toaster.js';
	import { LeaveLobbySchema } from '$lib/modules/schemas/leave-lobby-schema.js';
	import { useForm } from '$lib/modules/hooks/use-form.js';
	import { copyToClipboard } from '$lib/modules/ui/copy-to-clipboard.js';

	const { data } = $props();

	const { form, enhance, submitting } = useForm(data.form, {
		validators: valibot(LeaveLobbySchema),
		async onUpdate(event) {
			if (!event.form.valid) {
				return;
			}
			const leaveLobbyResponse = await supabase.from('lobby_member').delete().match({
				lobby_id: event.form.data['lobby-id'],
				user_id: event.form.data['user-id']
			});
			if (leaveLobbyResponse.error) {
				event.form.valid = false;
				toaster.error({
					title: 'Failed to leave lobby',
					description: leaveLobbyResponse.error.details
				});
				return;
			}
			toaster.success({
				title: 'Successfully left lobby'
			});
		}
	});

	async function copyLobbyId() {
		await copyToClipboard(data.lobby.id);
		toaster.info({
			title: 'Lobby ID copied to clipboard'
		});
	}
</script>

<div class="flex h-full flex-col gap-2">
	<div class="flex justify-between">
		<div>
			<button class="hover:underline" onclick={copyLobbyId}>ID: {data.lobby.id}</button>
			<p>Realm: {data.lobby.trial.realm.name}</p>
			<p>Trial: {data.lobby.trial.name}</p>
		</div>
		<img
			class="object-fit h-72 rounded-md"
			src={data.lobby.trial.image_url}
			alt={data.lobby.trial.name}
		/>
	</div>
	<form class="contents" method="post" autocomplete="off" use:enhance>
		<input type="hidden" name="lobby-id" bind:value={$form['lobby-id']} />
		<input type="hidden" name="user-id" bind:value={$form['user-id']} />
		<Button class="mt-auto ml-auto" disabled={$submitting}>Leave Lobby</Button>
	</form>
</div>
