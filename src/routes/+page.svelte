<script lang="ts">
  import Layout from '$lib/components/layout.svelte';
  import { WebviewWindow } from '@tauri-apps/api/webviewWindow';
  import { currentMonitor, getAllWindows } from '@tauri-apps/api/window';
  import Fuse from 'fuse.js'

  const { data } = $props();

  const fuse = $derived(new Fuse(data.trials, {
    threshold: 0.5,
    keys: ['name', 'code', 'realm.name', 'realm.code']
  }));

  let query = $state('');

  const trials = $derived.by(() => {
    if (!query) {
      return data.trials;
    }
    return fuse.search(query).map(result => result.item);
  });

  async function showTrial(trial: typeof data.trials[number]) {
    const window = await WebviewWindow.getByLabel('trial');
    if (!window) {
      throw new Error('No window found');
    }
    trialWindow.setTrial(trial);
    window.show();
  }
</script>

<Layout>
  <input bind:value={query} class="input" placeholder="Search trial..." />

  <hr class="hr" />
  
  <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
    {#each trials as trial (trial.id)}
      <li>
        <button onclick={() => showTrial(trial)} class="grid gap-2 btn preset-filled-surface-100-900 p-4 text-start">
          <div class="grid">
            <span>{trial.name}</span>
            <span class="opacity-50 text-sm">{trial.realm.name}</span>
          </div>
          <img class="rounded-md" src={trial.image_url} alt={trial.name} />
        </button>
      </li>
    {/each}
  </ul>
</Layout>

