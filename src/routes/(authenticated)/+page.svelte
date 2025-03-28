<script lang="ts">
import { createLobby } from "$lib/supabase/lobby/create-lobby";
import { joinLobby } from "$lib/supabase/lobby/join-lobby.js";
import { leaveLobby } from "$lib/supabase/lobby/leave-lobby";

const { data } = $props();

async function submitJoinLobby(event: Event) {
	if (!(event.target instanceof HTMLFormElement)) {
		return;
	}
	event.preventDefault();
	const data = new FormData(event.target);
	const id = data.get("id") as string | null;
	if (!id) {
		return;
	}
	await joinLobby(id);
}
</script>

<div class="grid gap-2">  
  {#if data.lobby}
    {#if data.lobby.user_id === data.session.user.id}
      <button class="btn preset-filled-primary-500">Choose Map</button>
    {/if}
    <button class="btn preset-filled-primary-500" onclick={() => leaveLobby(data.lobby!)}>Leave Lobby</button>
  {:else}
    <form class="input-group grid-cols-[1fr_auto]" onsubmit={submitJoinLobby}>
      <input name="id" class="ig-input" placeholder="Enter ID..." />
      <button class="ig-btn preset-filled-primary-500">
        Join Lobby
      </button>
    </form>
    <button class="btn preset-filled-primary-500" onclick={createLobby}>Create Lobby</button>
  {/if}
</div>


