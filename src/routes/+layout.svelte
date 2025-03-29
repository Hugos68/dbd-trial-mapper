<script lang="ts">
import "../app.css";
import { page } from "$app/state";
import { useDocumentHeight } from "$lib/hooks/use-document-height.svelte";
import { useRealtimeRecord } from "$lib/hooks/use-realtime-record.svelte";
import { PhysicalSize } from "@tauri-apps/api/dpi";
import { WebviewWindow } from "@tauri-apps/api/webviewWindow";
import { Position, moveWindow } from "@tauri-apps/plugin-positioner";

const { children, data } = $props();

const preference = $derived(
	useRealtimeRecord({
		record: data.preference,
		table: "preference",
	}),
);

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
	await moveWindow(position);
});

const width = $derived.by(() => {
	if (page.url.pathname === "/trial") {
		return preference.current.window_width;
	}
	return 400;
});
const documentHeight = useDocumentHeight();
const height = $derived(Math.ceil(documentHeight.current));
const size = $derived(new PhysicalSize(width, height));

// @ts-expect-error - This is fine as long as we don't return cleanup functions
$effect(async () => {
	const window = WebviewWindow.getCurrent();
	await window.setSize(size);
	// Always move the window after resizing
	await moveWindow(position);
});

// @ts-expect-error - This is fine as long as we don't return cleanup functions
$effect(async () => {
	const window = WebviewWindow.getCurrent();
	await window.show();
});
</script>

{@render children()}
