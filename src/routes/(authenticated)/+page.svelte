<script lang="ts">
import { useRealtimeLobby } from "$lib/hooks/use-realtime-lobby.svelte.js";
import { supabase } from "$lib/supabase/client.js";
import { createLobby } from "$lib/supabase/lobby/create-lobby";
import { joinLobby } from "$lib/supabase/lobby/join-lobby.js";
import { leaveLobby } from "$lib/supabase/lobby/leave-lobby";

const { data } = $props();

const lobby = data.lobby ? useRealtimeLobby(data.lobby) : null;

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
		.eq("id", lobby.current.id)
		.select();
	if (updateLobbyResponse.error) {
		throw new Error(updateLobbyResponse.error.message);
	}
	await lobby.channel.send({
		type: "broadcast",
		event: "trial-update",
		payload: updateLobbyResponse.data,
	});
}
</script>

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
    <button class="btn preset-filled-primary-500" onclick={() => leaveLobby(lobby.current)}>Leave Lobby</button>
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


