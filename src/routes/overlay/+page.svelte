<script lang="ts">
import { invalidateAll } from "$app/navigation";
import { PhysicalSize } from "@tauri-apps/api/dpi";
import { WebviewWindow } from "@tauri-apps/api/webviewWindow";
import { Position, moveWindow } from "@tauri-apps/plugin-positioner";
import { ElementRect } from "runed";

const { data } = $props();

const overlay = WebviewWindow.getCurrent();
const documentRect = new ElementRect(() => document.documentElement);

$effect(() => {
	overlay.setSize(
		new PhysicalSize(400, Math.round(documentRect.current.height)),
	);
	moveWindow(Position.TopRight);
});

overlay.listen("update", invalidateAll);
</script>

{#if data.lobby.trial}
    <img src={data.lobby.trial.image_url} alt={data.lobby.trial.name} />
{:else}
    <span>No trial chosen</span>
{/if}

