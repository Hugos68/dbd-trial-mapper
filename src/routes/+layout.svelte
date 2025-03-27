<script lang="ts">
import { useDynamicHeight } from "$lib/hooks/use-dynamic-height.svelte";
import { useShowWindow } from "$lib/hooks/use-show-window";
import { useWindowPosition } from "$lib/hooks/use-window-position";
import { Position } from "@tauri-apps/plugin-positioner";
import "../app.css";

const { children } = $props();

useDynamicHeight();
useWindowPosition(Position.TopRight);
useShowWindow();
</script>

<main class="p-4 grid gap-4">
    {@render children()}
</main>
