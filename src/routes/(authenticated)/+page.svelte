<script lang="ts">
import { createLobby } from "$lib/supabase/create-lobby";
import { leaveLobby } from "$lib/supabase/leave-lobby.js";
import { signOut } from "$lib/supabase/sign-out";

const { data } = $props();
</script>

<div>
  <h1 class="h1">Dashboard</h1>
  <span class="text-surface-500 text-sm">Welcome {data.session?.user.user_metadata.full_name}</span>
</div>

<div class="grid gap-2">
  {#if data.lobby}
    <button class="btn preset-filled" onclick={() => leaveLobby(data.lobby!)}>Leave Lobby</button>
  {:else}
    <div class="grid grid-cols-2 gap-2">
      <button class="btn preset-filled" onclick={createLobby}>Create Lobby</button>
      <button class="btn preset-filled">Join Lobby</button>
    </div>
  {/if}
  <button class="btn preset-filled-error-500" onclick={signOut}>Sign Out</button>
</div>


