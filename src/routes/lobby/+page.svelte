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
	import { LoaderCircleIcon } from '@lucide/svelte';
	import { groupBy } from '$lib/modules/ui/group-by.js';

	const { data } = $props();

	async function copyLobbyId() {
		await copyToClipboard(data.lobby.id);
		toaster.info({
			title: 'Lobby ID copied to clipboard',
		});
	}

	const {
		form: updateLobbyForm,
		submitting: updateLobbySubmitting,
		errors: updateLobbyErrors,
		enhance: updateLobbyEnhance,
		isTainted: updateLobbyIsTainted,
		tainted: updateLobbyTainted,
	} = useForm(data.updateLobbyForm, {
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
				event.form.valid = false;
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

	const { submitting: leaveLobbySubmitting, enhance: leaveLobbyEnhance } =
		useForm(data.leaveLobbyForm, {
			async onUpdate(event) {
				if (!event.form.valid) {
					return;
				}
				const leaveLobbyResponse = await supabase
					.from('lobby_member')
					.delete()
					.match({
						lobby_id: data.lobby.id,
						user_id: page.data.user.id,
					});
				if (leaveLobbyResponse.error) {
					event.form.valid = false;
					toaster.error({
						title: 'Failed to leave lobby',
						description: leaveLobbyResponse.error.details,
					});
					return;
				}
				toaster.success({
					title: 'Successfully left lobby',
				});
			},
		});
</script>

<Layout title="Lobby">
	<div class="flex h-full flex-col gap-4">
		<div class="flex items-start justify-between gap-8">
			<form
				class="flex h-full w-full flex-col gap-4"
				method="post"
				autocomplete="off"
				use:updateLobbyEnhance
			>
				<label class="grid gap-1">
					<span class="text-sm">Lobby ID</span>
					<div class="grid grid-cols-[1fr_auto]">
						<input
							class="rounded-l bg-transparent"
							bind:value={$updateLobbyForm.id}
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
						bind:value={$updateLobbyForm.user_id}
						readonly
					/>
				</label>
				<label class="grid gap-1">
					<span class="text-sm">Trial</span>
					<select
						bind:value={$updateLobbyForm.trial_id}
						class="rounded bg-neutral-200 dark:bg-neutral-800"
						disabled={data.lobby.user_id !== page.data.user.id}
					>
						{#each Object.entries(groupBy(data.trials, (trial) => trial.realm.id)) as [realmId, trials] (realmId)}
							<optgroup label={trials[0].realm.name}>
								{#each trials as trial (trial.id)}
									<option
										value={trial.id}
										selected={$updateLobbyForm.trial_id === trial.id}
									>
										{trial.name}
									</option>
								{/each}
							</optgroup>
						{/each}
					</select>
					{#if $updateLobbyErrors.trial_id}
						<span class="text-sm text-red-500"
							>{$updateLobbyErrors.trial_id.join(', ')}</span
						>
					{/if}
				</label>
				<Button
					class="mt-auto ml-auto"
					disabled={data.lobby.user_id !== page.data.user.id ||
						$updateLobbySubmitting ||
						!updateLobbyIsTainted($updateLobbyTainted)}
				>
					{#if $updateLobbySubmitting}
						<LoaderCircleIcon class="animate-spin" />
					{:else}
						Update Lobby
					{/if}
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
		<form
			class="flex h-full"
			method="post"
			autocomplete="off"
			use:leaveLobbyEnhance
		>
			<Button class="mt-auto ml-auto" disabled={$leaveLobbySubmitting}>
				{#if $leaveLobbySubmitting}
					<LoaderCircleIcon class="animate-spin" />
				{:else}
					Leave Lobby
				{/if}
			</Button>
		</form>
	</div>
</Layout>
