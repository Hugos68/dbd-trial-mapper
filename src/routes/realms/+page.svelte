<script lang="ts">
import Layout from "$lib/components/layout.svelte";

const { data } = $props();
</script>

<Layout>
    <ol class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {#each data.realms as realm (realm.id)}
            <li>
                <a href="/realms/{realm.id}" class="btn preset-filled w-full aspect-square">{realm.name}</a>
            </li>
        {/each}
    </ol>
</Layout>
