<script lang="ts">
import { signOut } from "$lib/supabase/sign-out";
</script>

<h1 class="h1">Dashboard</h1>

<div class="grid gap-2">
  <a class="btn preset-filled" href="/lobby/create">Create Lobby</a>
  <a class="btn preset-filled" href="/lobby/join">Join Lobby</a>
  <button class="btn preset-filled-error-500" onclick={signOut}>Sign Out</button>
</div>


