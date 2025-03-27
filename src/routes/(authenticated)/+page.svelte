<script lang="ts">
import { signOut } from "$lib/supabase/auth/sign-out";
import { createLobby } from "$lib/supabase/lobby/create-lobby";
import { leaveLobby } from "$lib/supabase/lobby/leave-lobby";

const { data } = $props();
</script>

<div>
  <h1 class="h1">Dashboard</h1>
  <span class="text-surface-500 text-sm">Welcome {data.session?.user.user_metadata.full_name}</span>
</div>

<div class="grid gap-2">
  {#if data.lobby}
    {#if data.lobby.user_id === data.session.user.id}
      <button class="btn preset-filled-primary-500">Choose Map</button>
    {/if}
    <button class="btn preset-filled-primary-500" onclick={() => leaveLobby(data.lobby!)}>Leave Lobby</button>
  {:else}
    <button class="btn preset-filled-primary-500" onclick={createLobby}>Create Lobby</button>
    <form class="input-group grid-cols-[1fr_auto]">
      <input class="ig-input" placeholder="Enter ID..." />
      <button class="ig-btn preset-filled-primary-500">
        Join
      </button>
    </form>
  {/if}
  <button class="btn preset-filled-primary-500">Preferences</button>
  <button class="btn preset-filled-error-500" onclick={signOut}>Sign Out</button>
</div>


