<script lang="ts">
import Layout from "$lib/components/layout.svelte";
import { signInWithOAuth } from "$lib/supabase/auth/sign-in-with-oauth";
</script>

<Layout title="Sign In" description="Sign in to your account" authenticated={false}>
    <div class="grid gap-2">
        {#each ["google"] as const as provider}
            <button class="btn preset-filled capitalize" onclick={() => signInWithOAuth(provider)}>
                {provider}
            </button>
        {/each}
    </div>
</Layout>
