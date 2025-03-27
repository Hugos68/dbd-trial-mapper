<script lang="ts">
import { invalidateAll } from "$app/navigation";
import { supabase } from "$lib/supabase";
import { Home, LogOut, LogIn, Plus, Users } from '@lucide/svelte'; 
import "../app.css";

const { children, data } = $props();

async function sign_out() {
	await supabase.auth.signOut();
	await invalidateAll();
}
</script>

<header class="preset-filled-surface-100-900 p-4 rounded-b-md flex justify-between">
	<nav>
		<a class="btn preset-filled" href="/"><Home /></a>
	</nav>
	<nav class="flex gap-2">
		{#if data.session}
			<a class="btn preset-filled" href="/lobby/create"><Plus /></a>
			<a class="btn preset-filled" href="/lobby/join"><Users /></a>
			<button class="btn preset-filled-error-500" onclick={sign_out}><LogOut /></button>
		{:else}
			<a class="btn preset-filled-success-500" href="/sign-in"><LogIn /></a>
		{/if}
	</nav>
</header>

<main class="p-4">
	{@render children()}
</main>


