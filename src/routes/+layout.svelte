<script lang="ts">
import { useDynamicHeight } from "$lib/hooks/use-dynamic-height.svelte";
import { useShowWindow } from "$lib/hooks/use-show-window";
import { useWindowPosition } from "$lib/hooks/use-window-position";
import { Position } from "@tauri-apps/plugin-positioner";
import "../app.css";

const { children } = $props();

async function setup() {
	useDynamicHeight();
	await useWindowPosition(Position.TopRight);
	await useShowWindow();
}

$effect(() => {
	setup();
});
</script>

{@render children()}
