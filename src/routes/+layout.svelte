<script lang="ts">
import { invalidateAll } from "$app/navigation";
import { supabase } from "$lib/supabase";
import { Home, LogOut, LogIn, Plus, Users } from '@lucide/svelte'; 
import "../app.css";
import { Tooltip as BitsToolTip } from "bits-ui";
import Tooltip from "$lib/components/tooltip.svelte";

const { children, data } = $props();

async function sign_out() {
	await supabase.auth.signOut();
	await invalidateAll();
}
</script>

<BitsToolTip.Provider>
	<header class="preset-filled-surface-100-900 p-4 rounded-b-md flex justify-between">
		<nav>
			<Tooltip>
				{#snippet trigger({ props })}
					<a {...props} class="btn preset-filled" href="/"><Home /></a>
				{/snippet}
				{#snippet content()}
					<span>Home</span>
				{/snippet}
			</Tooltip>
		</nav>
		<nav class="flex gap-2">
			{#if data.session}
				<Tooltip>
					{#snippet trigger({ props })}
						<a {...props} class="btn preset-filled" href="/lobby/create"><Plus /></a>
					{/snippet}
					{#snippet content()}
						<span>Create Lobby</span>
					{/snippet}
				</Tooltip>
				<Tooltip>
					{#snippet trigger({ props })}
						<a {...props} class="btn preset-filled" href="/lobby/join"><Users /></a>
					{/snippet}
					{#snippet content()}
						<span>Join Lobby</span>
					{/snippet}
				</Tooltip>
				<Tooltip>
					{#snippet trigger({ props })}
						<button {...props} class="btn preset-filled-error-500" onclick={sign_out}><LogOut /></button>
					{/snippet}
					{#snippet content()}
						<span>Sign Out</span>
					{/snippet}
				</Tooltip>
			{:else}
				<Tooltip>
					{#snippet trigger({ props })}
						<a {...props} class="btn preset-filled-success-500" href="/sign-in"><LogIn /></a>
					{/snippet}
					{#snippet content()}
						<span>Sign Out</span>
					{/snippet}
				</Tooltip>
			{/if}
		</nav>
	</header>
	
	<main class="p-4">
		{@render children()}
	</main>
</BitsToolTip.Provider>


