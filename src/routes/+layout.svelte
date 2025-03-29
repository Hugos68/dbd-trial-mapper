<script lang="ts">
import { useDynamicHeight } from "$lib/hooks/use-dynamic-height.svelte";
import { useShowWindow } from "$lib/hooks/use-show-window";
import { useWindowPosition } from "$lib/hooks/use-window-position";
import { error } from "@sveltejs/kit";
import { Position } from "@tauri-apps/plugin-positioner";
import "../app.css";

const { children, data } = $props();

async function setup() {
	useDynamicHeight(data.preference.window_width);
	switch (data.preference.window_position) {
		case "TOP_RIGHT":
			await useWindowPosition(Position.TopRight);
			break;
		case "TOP_LEFT":
			await useWindowPosition(Position.TopLeft);
			break;
		default:
			error(500, "Invalid window position");
	}
	await useShowWindow();
}

$effect(() => {
	setup();
});
</script>

{@render children()}
