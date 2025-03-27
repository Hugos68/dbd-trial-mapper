<script lang="ts">
import { invalidate, invalidateAll } from "$app/navigation";
import { WebviewWindow } from "@tauri-apps/api/webviewWindow";
import { Position, moveWindow } from "@tauri-apps/plugin-positioner";

const { data } = $props();

moveWindow(Position.TopRight);

WebviewWindow.getCurrent().listen("update", async () => {
	await invalidateAll();
});
</script>

{#if data.lobby.trial}
    <img src={data.lobby.trial.image_url} alt={data.lobby.trial.name} />
{:else}
    <span>No trial chosen</span>
{/if}

