<script lang="ts">
import type { Tables } from "$lib/supabase/types";
import { promisifyImage } from "$lib/utilities/promisify-image";

interface Lobby extends Tables<"lobby"> {
	trial: Tables<"trial">;
}

interface Props {
	lobby: Lobby;
	onBackToLobby: () => void;
}

const { lobby, onBackToLobby }: Props = $props();
</script>


<div class="group">
    {#await promisifyImage(lobby.trial.image_url)}
        <div class="grid place-items-center py-32">
            <span>Loading image...</span>
        </div>
    {:then imageUrl}
        <button onclick={onBackToLobby} class="translate-y-16 group-hover:translate-y-0 btn preset-filled-primary-500 absolute left-1/2 -translate-x-1/2 bottom-4">
            Back to Lobby
        </button>
        <img src={imageUrl} alt={lobby.trial?.name} class="w-full h-full object-cover" />
    {:catch error}
        <div class="grid place-items-center py-32">
            <span>Error loading image</span>
            <span class="text-sm text-surface-500">{error.message}</span>
        </div>
    {/await}
</div>