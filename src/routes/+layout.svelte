<script lang="ts">
import { Position } from '@tauri-apps/plugin-positioner';
import { useWindowPosition } from '$lib/hooks/use-window-position';
import { useShowWindow } from '$lib/hooks/use-show-window';
import { useDynamicHeight } from '$lib/hooks/use-dynamic-height.svelte';
import '../app.css';

const { children } = $props();

useDynamicHeight();
useWindowPosition(Position.TopRight);
useShowWindow();
</script>

{@render children()}