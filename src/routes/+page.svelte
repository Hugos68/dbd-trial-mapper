<script lang="ts">
  import { emit, listen } from '@tauri-apps/api/event';
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

  listen<string>('trial_select:done', (url) => {
    console.log(url);
  });
</script>


<input bind:value={query} class="input" placeholder="Search trial..." />

<hr class="hr" />

<ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
  {#each trials as trial (trial.id)}
    <li>
      <button onclick={() => emit('trial', trial.image_url)} class="grid gap-2 btn preset-filled-surface-100-900 p-4 text-start">
        <div class="grid">
          <span>{trial.name}</span>
          <span class="opacity-50 text-sm">{trial.realm.name}</span>
        </div>
        <img class="rounded-md" src={trial.image_url} alt={trial.name} />
      </button>
    </li>
  {/each}
</ul>