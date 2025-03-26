<script lang="ts">
    import type { Snippet } from "svelte";

    interface Props {
        children: Snippet;
    }
    
    const props: Props = $props();
</script>

<main class="p-4 grid gap-4">
    {@render props.children()}
</main>
