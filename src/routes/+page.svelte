<script lang="ts">
  import { Plus, UserPlus, List, Settings } from '@lucide/svelte';

  const { data } = $props();

  const trial = data.trials.at(0);
</script>

{#if trial}
  <img src={trial.image_url} alt={trial.name} />
{:else}
  <div class="h-36 grid place-items-center">
    <span>No trial chosen</span>
  </div>
{/if}

<footer class="grid grid-cols-2 gap-2 p-2">
  <button class="btn preset-filled-primary-500">
    <Plus />
  </button>
  <button class="btn preset-filled-primary-500">
    <UserPlus />
  </button> 
  <button class="btn preset-filled-primary-500">
    <List />
  </button>
  <button class="btn preset-filled-primary-500">
    <Settings />
  </button>
</footer>