<script lang="ts">
import type { Tables } from "$lib/supabase/types";
import { CopyIcon } from "@lucide/svelte";

interface Props {
	lobby: Tables<"lobby">;
}

const { lobby }: Props = $props();

async function copyLobbyId(lobbyId: string) {
	await navigator.clipboard.writeText(lobbyId);
}
</script>

<div class="input-group grid-cols-[1fr_auto]">
    <input class="ig-input" value={lobby.id} readonly />
    <button class="ig-btn preset-filled-primary-500" onclick={() => copyLobbyId(lobby.id)}>
        <CopyIcon />
    </button>
</div>