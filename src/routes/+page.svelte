<script lang="ts">
  import Layout from '$lib/components/layout.svelte';
  import { WebviewWindow } from '@tauri-apps/api/webviewWindow';

  const { data } = $props();


  async function showTrial(trial: typeof data.trials[number]) {
    const overlay = await WebviewWindow.getByLabel('overlay');
    if (!overlay) {
      throw new Error('No window found');
    }
    await overlay.emit('load:image', trial.image_url);
    await overlay.show();
  }
</script>

<Layout>
  <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
    {#each data.trials as trial (trial.id)}
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

