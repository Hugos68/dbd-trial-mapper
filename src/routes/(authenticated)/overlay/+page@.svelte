<script lang="ts">
import { use_document_height } from "$lib/hooks/use-document-height.svelte.js";
import { WebviewWindow } from "@tauri-apps/api/webviewWindow";
import { Position, moveWindow } from "@tauri-apps/plugin-positioner";

const { data } = $props();

const overlay = WebviewWindow.getCurrent();
overlay.listen("update", () => {
	console.log("update");
});
moveWindow(Position.TopRight);
use_document_height();
</script>

<div class="contents select-none">
    {#if data.lobby.trial}
        <img src={data.lobby.trial.image_url} alt={data.lobby.trial.name} />
    {:else}
        <div class="grid place-items-center border border-dashed border-primary-500 rounded-md py-16">
            <span class="text-surface-500">No trial chosen</span>
        </div>
    {/if}
</div>

    