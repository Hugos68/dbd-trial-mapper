<script lang="ts">
const { data } = $props();
</script>

{#if data.lobby.trial}
    <img src={data.lobby.trial.image_url} alt={data.lobby.trial.name} />
{:else}
    <span>No trial chosen</span>
{/if}

