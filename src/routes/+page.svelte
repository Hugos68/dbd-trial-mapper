<script lang="ts">
  const { data } = $props();
</script>

<search>
  <input class="input" type="search" placeholder="Search trial..." />
</search>

<ul>
  {#each data.trials as trial}
    <li>{trial.name}</li>
  {/each}
</ul>