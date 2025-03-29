<script lang="ts">
import Layout from "$lib/components/layout.svelte";
import { useRealtimeLobby } from "$lib/hooks/use-realtime-lobby.svelte.js";
import { supabase } from "$lib/supabase/client.js";
import { createLobby } from "$lib/supabase/lobby/create-lobby";
import { joinLobby } from "$lib/supabase/lobby/join-lobby.js";
import { leaveLobby } from "$lib/supabase/lobby/leave-lobby";
import { promisifyImage } from "$lib/utilities/promisify-image.js";

const { data } = $props();

const lobby = $derived(data.lobby ? useRealtimeLobby(data.lobby) : undefined);

const trialsGroupedByRealm = $derived(
	data.trials.reduce((realms, trial) => {
		const realm = realms.get(trial.realm.name);
		if (!realm) {
			realms.set(trial.realm.name, [trial]);
		} else {
			realm.push(trial);
		}
		return realms;
	}, new Map<string, typeof data.trials>()),
);

async function submitJoinLobby(event: SubmitEvent) {
	if (!(event.target instanceof HTMLFormElement)) {
		return;
	}
	event.preventDefault();
	const formData = new FormData(event.target);
	const id = formData.get("id") as string | null;
	if (!id) {
		return;
	}
	await joinLobby(id);
}

async function submitSelectTrial(event: SubmitEvent) {
	if (!(event.target instanceof HTMLFormElement) || !lobby) {
		return;
	}
	event.preventDefault();
	const formData = new FormData(event.target);
	const trialId = formData.get("trial") as string | null;
	const updateLobbyResponse = await supabase
		.from("lobby")
		.update({
			trial_id: trialId,
		})
		.eq("id", lobby.current.id);
	if (updateLobbyResponse.error) {
		throw new Error(updateLobbyResponse.error.message);
	}
}

let showTrial = $state(false);
</script>

{#if lobby?.current.trial && showTrial}
	<div class="group">
		{#if lobby.current?.trial}
			{#await promisifyImage(lobby.current.trial.image_url)}
				<div class="grid place-items-center py-32">
					<span>Loading image...</span>
				</div>
			{:then imageUrl}
				<button onclick={() => (showTrial = false)} class="translate-y-16 group-hover:translate-y-0 btn preset-filled-primary-500 absolute left-1/2 -translate-x-1/2 bottom-4">Hide Trial</button>
				<img src={imageUrl} alt={lobby.current.trial?.name} class="w-full h-full object-cover" />
			{:catch error}
				<div class="grid place-items-center py-32">
					<span>Error loading image</span>
					<span class="text-sm text-surface-500">{error.message}</span>
				</div>
			{/await}
		{:else}
			<div class="grid place-items-center py-32">
				<span>No trial selected</span>
				<span class="text-sm text-surface-500">
					Waiting for the host to select a trial
				</span> 
			</div>
		{/if}
	</div>
{:else}
	<Layout title="Lobby" description={lobby ? `ID: ${lobby.current.id}` : "Join or create a lobby"} authenticated={true}>
		<div class="grid gap-2">
			{#if lobby}
				<form onsubmit={submitSelectTrial}>
					<select name="trial" class="select ring" disabled={lobby.current.user_id !== data.session.user.id} oninput={(event) => event.currentTarget.form?.requestSubmit()}>
					{#each trialsGroupedByRealm as [realm, trials]}
						<optgroup label={realm}>
						{#each trials as trial}
							<option value={trial.id} selected={lobby.current.trial?.id === trial.id}>
								{trial.name}
							</option>
						{/each}
						</optgroup>
					{/each}
					</select>      
				</form>
				<button class="btn preset-filled-primary-500" onclick={() => (showTrial = true)}>Show Trial</button>
				<button class="btn preset-filled-primary-500" onclick={() => leaveLobby(lobby!.current)}>Leave Lobby</button>
			{:else}
			<form class="input-group grid-cols-[1fr_auto]" onsubmit={submitJoinLobby}>
				<input name="id" class="ig-input" placeholder="Enter ID..." />
				<button class="ig-btn preset-filled-primary-500">
					Join Lobby
				</button>
			</form>
			<button class="btn preset-filled-primary-500" onclick={createLobby}>Create Lobby</button>
			{/if}
		</div>	  
	</Layout>
{/if}

