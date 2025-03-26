<script lang="ts">
  const items = $state(['test']);
</script>

<input class="input" value="test" onkeydown={(e) => {
  if (e.currentTarget.value === 'Enter') {
    items.push(e.currentTarget.value);
    e.currentTarget.value = '';
  }
}} />

{#each items as item}
  <div>{item}</div>
{/each}
