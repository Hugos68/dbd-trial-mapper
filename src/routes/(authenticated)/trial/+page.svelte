<script lang="ts">
import { useRealtimeLobby } from "$lib/hooks/use-realtime-lobby.svelte";
import { XIcon } from "@lucide/svelte";

const { data } = $props();

const lobby = useRealtimeLobby(data.lobby);

async function promisifyUrl(url: string) {
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(response.statusText);
	}
	return URL.createObjectURL(await response.blob());
}
</script>

{#if lobby.current.trial}
    {#await promisifyUrl(lobby.current.trial.image_url)}
        <div class="grid place-items-center py-16">
            <span>Loading...</span>
            <span class="text-sm text-surface-500">Loading trial image</span> 
        </div>
    {:then imageUrl}
        <img class="min-h-full" src={lobby.current.trial?.image_url} alt={lobby.current.trial?.name} />
    {:catch error}
        <div class="grid place-items-center py-16">
            <span>Error loading image</span>
            <span class="text-sm text-surface-500">{error.message}</span> 
        </div>
    {/await}
{:else}
    <div class="grid place-items-center py-16">
        <span>No trial selected</span>
        <span class="text-sm text-surface-500">
            Waiting for the host to select a trial
        </span> 
    </div>
{/if}
<a href="/" class="absolute top-4 right-4"><XIcon /></a>


