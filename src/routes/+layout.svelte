<script lang="ts">
    import { useDynamicWindowSize } from '$lib/hooks/use-dynamic-window-size.svelte.js';
    import { useTopRightWindowPosition } from '$lib/hooks/use-top-right-window-position.js';
    import { WebviewWindow } from '@tauri-apps/api/webviewWindow';
    import '../app.css';

    const { children } = $props();

    async function setup() {
        useDynamicWindowSize();
        await useTopRightWindowPosition();
        await WebviewWindow.getCurrent().show();
    }

    setup();
</script>

{@render children()}    