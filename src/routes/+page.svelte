<script lang="ts">
  import { TrialWindow } from '$lib/trial.js';
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

  async function selectTrial(trial) {
    TrialWindow.getInstance().show(trial);
  }
</script>


<input bind:value={query} class="input" type="search" placeholder="Search trial..." />

<hr class="hr" />

<ul class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
  {#each trials as trial (trial.id)}
    <li>
      <button onclick={() => selectTrial(trial)} class="flex-1 grid gap-2 btn preset-filled-surface-100-900 p-4 text-start">
        <div class="grid">
          <span>{trial.name}</span>
          <span class="opacity-50 text-sm">{trial.realm.name}</span>
        </div>
        <img class="rounded-md" src="https://rsscmciuemxtmlktlakz.supabase.co/storage/v1/object/public/maps/{trial.realm.code}/{trial.code}.webp" alt={trial.name} />
      </button>
    </li>
  {/each}
</ul>