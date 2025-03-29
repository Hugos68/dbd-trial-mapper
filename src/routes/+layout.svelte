<script lang="ts">
import "../app.css";
import { useDocumentHeight } from "$lib/hooks/use-document-height.svelte";
import { useRealtimeRecord } from "$lib/hooks/use-realtime-record.svelte";
import { PhysicalSize } from "@tauri-apps/api/dpi";
import { WebviewWindow } from "@tauri-apps/api/webviewWindow";
import { Position, moveWindow } from "@tauri-apps/plugin-positioner";

const { children, data } = $props();

const preference = useRealtimeRecord({
	record: data.preference,
	table: "preference",
});

const height = useDocumentHeight();

const size = $derived.by(() => {
	return new PhysicalSize(
		preference.current.window_width,
		Math.ceil(height.current),
	);
});

const position = $derived.by(() => {
	switch (preference.current.window_position) {
		case "TOP_LEFT":
			return Position.TopLeft;
		case "TOP_RIGHT":
			return Position.TopRight;
	}
});

// @ts-expect-error - This is fine as long as we don't return cleanup functions
$effect(async () => {
	const window = WebviewWindow.getCurrent();
	await window.setSize(size);
	await moveWindow(position);
	await window.show();
});
</script>

{@render children()}
