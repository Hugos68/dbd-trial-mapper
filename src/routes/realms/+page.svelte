<script lang="ts">
const { data } = $props();
</script>

<ul>
    {#each data.realms as realm (realm.id)}
        <li>
            <a href={`realms/${realm.id}`}>
                {realm.name}
            </a>
        </li>
    {/each}
</ul>