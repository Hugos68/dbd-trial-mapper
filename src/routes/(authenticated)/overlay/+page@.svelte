<script lang="ts">
import { use_document_height } from "$lib/hooks/use-document-height.svelte.js";
import { useRealtimeLobby } from "$lib/hooks/use-realtime-lobby.svelte.js";
import { Position, moveWindow } from "@tauri-apps/plugin-positioner";

const { data } = $props();

const lobby = useRealtimeLobby(data.lobby);

moveWindow(Position.TopRight);
use_document_height();
</script>

<div class="contents select-none">
    {#if lobby.current.trial}
        <img src={lobby.current.trial.image_url} alt={lobby.current.trial.name} />
    {:else}
        <div class="grid place-items-center border border-dashed border-primary-500 rounded-md py-16">
            <span class="text-surface-500">No trial chosen</span>
        </div>
    {/if}
</div>

    