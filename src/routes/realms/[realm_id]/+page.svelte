<script lang="ts">
const { data } = $props();
</script>

<h1 class="h1">{data.realm.name}</h1>

<ul class="grid gap-2">
    {#each data.trials as trial (trial.id)}
        <li>
            <a class="block btn preset-filled-primary-500" href="/?id={trial.id}">
                {trial.name}
            </a>
        </li>
    {/each}
</ul>
