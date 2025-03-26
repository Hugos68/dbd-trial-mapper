<script lang="ts">
import { invalidateAll } from "$app/navigation";
import { supabase } from "$lib/supabase";
import "../app.css";

const { children, data } = $props();

$effect(() => {
	const auth_state_listener = supabase.auth.onAuthStateChange(invalidateAll);
	return auth_state_listener.data.subscription.unsubscribe();
});

async function sign_out() {
	await supabase.auth.signOut();
}
</script>

<header class="preset-filled-surface-100-900 p-4 rounded-b-md">
	<nav class="flex justify-between">
		<a class="btn preset-filled" href="/">Home</a>
		{#if data.session}
			<button class="btn preset-filled" onclick={sign_out}>Sign Out</button>
		{:else}
			<a class="btn preset-filled" href="/sign-in">Sign In</a>
		{/if}
	</nav>
</header>

{@render children()}
