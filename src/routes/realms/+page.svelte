<script lang="ts">
    const { data } = $props();
</script>


{#each data.realms as realm (realm.id)}
    <a href="/realms/{realm.id}" class="btn preset-filled">{realm.name}</a>
{/each}