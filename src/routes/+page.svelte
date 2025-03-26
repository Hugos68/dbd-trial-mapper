<script lang="ts">
  import { Plus, UserPlus, List, Settings } from '@lucide/svelte';
</script>

<div class="grid grid-cols-2 gap-2">
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
</div>