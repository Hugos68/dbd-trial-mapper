<script lang="ts">
	import Button from '$lib/components/button.svelte';
	import { supabase } from '$lib/modules/supabase/client';
	import { toaster } from '$lib/modules/ui/toaster.js';
	import { copyToClipboard } from '$lib/modules/ui/copy-to-clipboard.js';
	import { overlaySettings } from '$lib/modules/ui/overlay-settings.js';
	import Layout from '$lib/components/layout.svelte';
	import { page } from '$app/state';
	import { useForm } from '$lib/modules/hooks/use-form.js';
	import { UpdateLobbySchema } from '$lib/modules/schemas/update-lobby-schema.js';
	import { valibot } from 'sveltekit-superforms/adapters';

	const { data } = $props();

	async function copyLobbyId() {
		await copyToClipboard(data.lobby.id);
		toaster.info({
			title: 'Lobby ID copied to clipboard',
		});
	}

	const { form, submitting, enhance } = useForm(data.form, {
		validators: valibot(UpdateLobbySchema),
		resetForm: false,
		async onUpdate(event) {
			if (!event.form.valid) {
				return;
			}
			const updateLobbyResponse = await supabase
				.from('lobby')
				.update(event.form.data)
				.eq('id', data.lobby.id);
			if (updateLobbyResponse.error) {
				toaster.error({
					title: 'Failed to update lobby',
					description: updateLobbyResponse.error.details,
				});
				return;
			}
			toaster.success({
				title: 'Successfully updated lobby',
			});
		},
	});

	async function leaveLobby() {
		const leaveLobbyResponse = await supabase
			.from('lobby_member')
			.delete()
			.match({
				lobby_id: data.lobby.id,
				user_id: page.data.user.id,
			});
		if (leaveLobbyResponse.error) {
			toaster.error({
				title: 'Failed to leave lobby',
				description: leaveLobbyResponse.error.details,
			});
			return;
		}
		toaster.success({
			title: 'Successfully left lobby',
		});
	}
</script>

<Layout title="Lobby">
	<div class="flex h-full flex-col gap-4">
		<div class="flex items-start justify-between gap-8">
			<form
				class="flex h-full w-full flex-col gap-4"
				method="post"
				autocomplete="off"
				use:enhance
			>
				<label class="grid gap-1">
					<span class="text-sm">Lobby ID</span>
					<div class="grid grid-cols-[1fr_auto]">
						<input
							class="rounded-l bg-transparent"
							bind:value={$form.id}
							readonly
						/>
						<Button
							type="button"
							class="w-fit rounded-none rounded-r"
							onclick={copyLobbyId}
						>
							Copy ID
						</Button>
					</div>
				</label>
				<label class="grid gap-1">
					<span class="text-sm">User ID</span>
					<input
						class="rounded bg-transparent"
						bind:value={$form.user_id}
						readonly
					/>
				</label>
				<label class="grid gap-1">
					<span class="text-sm">Trial</span>
					<select
						bind:value={$form.trial_id}
						class="rounded bg-neutral-200 dark:bg-neutral-800"
						disabled={data.lobby.user_id !== page.data.user.id}
					>
						{#each data.trials as trial (trial.id)}
							<option
								value={trial.id}
								selected={data.lobby.trial.id === trial.id}
							>
								{trial.name}
							</option>
						{/each}
					</select>
				</label>
				<Button
					class="mt-auto ml-auto"
					disabled={$submitting || data.lobby.user_id !== page.data.user.id}
				>
					Update Lobby
				</Button>
			</form>
			<button
				class="transition-opacity"
				class:opacity-50={overlaySettings.current.visible}
				onclick={() =>
					(overlaySettings.current.visible = !overlaySettings.current.visible)}
			>
				<img
					class:border-dashed={overlaySettings.current.visible}
					class="object-fit max-h-72 rounded border"
					src={data.lobby.trial.image_url}
					alt={data.lobby.trial.name}
				/>
			</button>
		</div>
		<Button class="mt-auto ml-auto" onclick={leaveLobby}>Leave Lobby</Button>
	</div>
</Layout>
