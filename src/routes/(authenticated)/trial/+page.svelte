<script lang="ts">
import { useRealtimeLobby } from "$lib/hooks/use-realtime-lobby.svelte";

const { data } = $props();

const lobby = useRealtimeLobby(data.lobby);
</script>

<div class="group">
    <div class="bg-black/0 group-hover:bg-black/50 transition-[background-color] absolute inset-0 grid place-items-center">
        <a href="/" class="hidden group-hover:block btn preset-filled-primary-500">Hide Trial</a>
    </div>
    {#if lobby.current.trial}
        <img src={lobby.current.trial.image_url} alt={lobby.current.trial?.name} />
    {:else}
        <div class="grid place-items-center py-32">
            <span>No trial selected</span>
            <span class="text-sm text-surface-500">
                Waiting for the host to select a trial
            </span> 
        </div>
    {/if}
</div>

