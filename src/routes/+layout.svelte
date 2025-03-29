<script lang="ts">
import { useDynamicHeight } from "$lib/hooks/use-dynamic-height.svelte";
import { useShowWindow } from "$lib/hooks/use-show-window";
import { useWindowPosition } from "$lib/hooks/use-window-position";
import { error } from "@sveltejs/kit";
import { Position } from "@tauri-apps/plugin-positioner";
import "../app.css";
import { useRealtime } from "$lib/hooks/use-realtime.svelte";

const { children, data } = $props();

const preference = useRealtime({
	init: data.preference,
	table: "preference",
});

$effect(() => {
	switch (preference.current.window_position) {
		case "TOP_RIGHT":
			useWindowPosition(Position.TopRight);
			break;
		case "TOP_LEFT":
			useWindowPosition(Position.TopLeft);
			break;
		default:
			error(500, "Invalid window position");
	}
});

$effect(() => {
	useDynamicHeight(preference.current.window_width);
});

$effect(() => {
	useShowWindow();
});
</script>

{@render children()}
