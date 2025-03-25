<script lang="ts">
    import '../app.css';
    import { House, Plus, Unplug  } from '@lucide/svelte';
    import type { Snippet } from "svelte";

    interface Props {
        children: Snippet;
    }
    
    const props: Props = $props();
</script>
 
<header class="sticky top-0 preset-filled-surface-100-900 p-4 flex gap-2 justify-between items-center z-[999]">
    <nav>
        <a href="/" class="btn preset-filled-primary-500">Home <House class="size-5" /></a>
    </nav>

    <nav class="flex gap-2">
        <a href="/lobby/join" class="btn preset-filled-primary-500">Join <Unplug class="size-5" /></a>
        <a href="/lobby/create" class="btn preset-filled-primary-500">Create <Plus class="size-5" /></a>
    </nav>
</header>

<main class="p-4 grid gap-4">
    {@render props.children()}
</main>
