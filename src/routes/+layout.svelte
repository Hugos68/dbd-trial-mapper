<script lang="ts">
    import { useDynamicWindowSize } from '$lib/hooks/use-dynamic-window-size.svelte.js';
    import { useTopRightWindowPosition } from '$lib/hooks/use-top-right-window-position.js';
    import '../app.css';

    const { children } = $props();

    useDynamicWindowSize();
    useTopRightWindowPosition();
</script>

{@render children()}    