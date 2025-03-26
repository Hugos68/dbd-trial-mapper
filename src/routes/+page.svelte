<script lang="ts">
  let trial;
</script>

{#if trial}
  <img src={trial.image_url} />
{:else}
  <div class="h-36 grid place-items-center">
    <span>No trial chosen</span>
  </div>
{/if}