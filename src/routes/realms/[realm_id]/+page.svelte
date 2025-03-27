<script lang="ts">
const { data } = $props();

async function select_trial(trial: (typeof data.trials)[number]) {
	localStorage.setItem("trial", JSON.stringify(trial));
}
</script>

<ol class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
    {#each data.trials as trial (trial.id)}
        <li>
            <button onclick={() => select_trial(trial)} class="btn preset-filled w-full aspect-square">{trial.name}</button>
        </li>
    {/each}
</ol>
