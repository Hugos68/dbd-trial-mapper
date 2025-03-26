<script lang="ts">
const { data } = $props();
</script>

<ul class="grid gap-2">
    {#each data.realms as realm (realm.id)}
        <li>
            <a class="block btn preset-filled-primary-500" href="/realms/{realm.id}">
                {realm.name}
            </a>
        </li>
    {/each}
</ul>