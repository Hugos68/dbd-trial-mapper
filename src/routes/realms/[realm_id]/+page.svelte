<script lang="ts">
import { goto } from "$app/navigation";

const { data } = $props();

async function selectTrial(trial: (typeof data.trials)[number]) {
	localStorage.setItem("trial-id", trial.id);
	await goto("/", {
		invalidateAll: true,
	});
}
</script>

<ul class="grid gap-2">
    {#each data.trials as trial (trial.id)}
        <li>
            <button onclick={() => selectTrial(trial)} class="btn w-full justify-start preset-filled-primary-500" disabled={trial.id === data.trial?.id}>
                {trial.name}
            </button>
        </li>
    {/each}
</ul>
