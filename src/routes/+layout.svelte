<script lang="ts">
    import { useDynamicWindowSize } from '$lib/hooks/use-dynamic-window-size.svelte.js';
    import { useTopRightWindowPosition } from '$lib/hooks/use-top-right-window-position.js';
    import { WebviewWindow } from '@tauri-apps/api/webviewWindow';
    import '../app.css';

    const { children, data } = $props();

    const trial = data.trials.at(0);

    async function setup() {
        useDynamicWindowSize();
        await useTopRightWindowPosition();
        await WebviewWindow.getCurrent().show();
    }

    setup();
</script>

{#if trial}
  <img src={trial.image_url} alt={trial.name} />
{:else}
  <div class="h-36 grid place-items-center">
    <span>No trial chosen</span>
  </div>
{/if}

<main class="p-2">
    {@render children()}   
</main>
 