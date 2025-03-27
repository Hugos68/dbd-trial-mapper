<script lang="ts">
import { signInWithOAuth } from "$lib/supabase/auth/sign-in-with-oauth";
</script>

<div>
    <h1 class="h1">Welcome!</h1>
    <span class="text-surface-500 text-sm">Sign in with one of the follow providers</span>
</div>

<div class="grid gap-2">
    {#each ["google"] as const as provider}
        <button class="btn preset-filled capitalize" onclick={() => signInWithOAuth(provider)}>
            {provider}
        </button>
    {/each}
</div>
