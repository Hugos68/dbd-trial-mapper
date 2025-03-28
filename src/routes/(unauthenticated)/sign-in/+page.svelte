<script lang="ts">
import { signInWithOAuth } from "$lib/supabase/auth/sign-in-with-oauth";
</script>

<div class="grid gap-2">
    {#each ["google"] as const as provider}
        <button class="btn preset-filled capitalize" onclick={() => signInWithOAuth(provider)}>
            {provider}
        </button>
    {/each}
</div>
