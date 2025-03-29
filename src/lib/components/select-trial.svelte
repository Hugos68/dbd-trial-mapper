<script lang="ts">
import { supabase } from "$lib/supabase/client";
import type { Tables } from "$lib/supabase/types";
import { EyeIcon } from "@lucide/svelte";
import type { User } from "@supabase/auth-js";

interface Trial extends Tables<"trial"> {
	realm: Tables<"realm">;
}

interface Lobby extends Tables<"lobby"> {
	trial: Tables<"trial">;
}

interface Props {
	trials: Trial[];
	lobby: Lobby;
	user: User;
	onShowTrial: () => void;
}

const { trials, lobby, user, onShowTrial }: Props = $props();

const trialsGroupedByRealm = $derived(
	trials.reduce((realms, trial) => {
		const realm = realms.get(trial.realm.name);
		if (!realm) {
			realms.set(trial.realm.name, [trial]);
		} else {
			realm.push(trial);
		}
		return realms;
	}, new Map<string, Trial[]>()),
);

async function submitSelectTrial(event: SubmitEvent) {
	if (!(event.target instanceof HTMLFormElement)) {
		return;
	}
	event.preventDefault();
	const formData = new FormData(event.target);
	const trial = formData.get("trial") as string | null;
	if (!trial) {
		return;
	}
	const updateLobbyResponse = await supabase
		.from("lobby")
		.update({
			trial_id: trial,
		})
		.eq("id", lobby.id);
	if (updateLobbyResponse.error) {
		throw new Error(updateLobbyResponse.error.message);
	}
}
</script>

<div class="input-group grid-cols-[1fr_auto]" >
    <form class="contents" onsubmit={submitSelectTrial}>
        <select name="trial" class="select ring" disabled={lobby.user_id !== user.id} oninput={(event) => event.currentTarget.form?.requestSubmit()}>
            {#each trialsGroupedByRealm as [realm, trials]}
                <optgroup label={realm}>
                {#each trials as trial}
                    <option value={trial.id} selected={lobby.trial_id === trial.id}>
                        {trial.name}
                    </option>
                {/each}
                </optgroup>
            {/each}
        </select>
    </form>
    <button title="Show Trial" class="ig-btn preset-filled-primary-500" onclick={onShowTrial}><EyeIcon /></button>
</div>