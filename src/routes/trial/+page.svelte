<script lang="ts">
    
</script>

{#if trialWindow}
    <img class="max-w-full h-auto object-contain" src={trialWindow.getTrial().image_url} alt={trialWindow.getTrial().name} />
{/if}
