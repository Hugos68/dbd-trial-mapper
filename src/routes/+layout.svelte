<script lang="ts">
import { invalidateAll } from "$app/navigation";
import { supabase } from "$lib/supabase/client";
import {
	HomeIcon,
	LogInIcon,
	LogOutIcon,
	MapIcon,
	PlusIcon,
	UsersIcon,
} from "@lucide/svelte";
import "../app.css";
import Tooltip from "$lib/components/tooltip.svelte";
import * as bits from "bits-ui";

const { children, data } = $props();

async function sign_out() {
	await supabase.auth.signOut();
	await invalidateAll();
}
</script>

<bits.Tooltip.Provider>
	<header class="preset-filled-surface-100-900 p-4 rounded-b-md flex justify-between">
		<nav>
			<Tooltip>
				{#snippet trigger({ props })}
					<a {...props} class="btn preset-filled" href="/"><HomeIcon /></a>
				{/snippet}
				{#snippet content()}
					<span>Home</span>
				{/snippet}
			</Tooltip>
			<a href="/overlay">Overlay</a>
		</nav>
		<nav class="flex gap-2">
			{#if data.session}
				<Tooltip>
					{#snippet trigger({ props })}
						<a {...props} class="btn preset-filled" href="/realms"><MapIcon /></a>
					{/snippet}
					{#snippet content()}
						<span>Realms</span>
					{/snippet}
				</Tooltip>
				<Tooltip>
					{#snippet trigger({ props })}
						<a {...props} class="btn preset-filled" href="/lobby/create"><PlusIcon  /></a>
					{/snippet}
					{#snippet content()}
						<span>Create Lobby</span>
					{/snippet}
				</Tooltip>
				<Tooltip>
					{#snippet trigger({ props })}
						<a {...props} class="btn preset-filled" href="/lobby/join"><UsersIcon  /></a>
					{/snippet}
					{#snippet content()}
						<span>Join Lobby</span>
					{/snippet}
				</Tooltip>
				<Tooltip>
					{#snippet trigger({ props })}
						<button {...props} class="btn preset-filled-error-500" onclick={sign_out}><LogOutIcon /></button>
					{/snippet}
					{#snippet content()}
						<span>Sign Out</span>
					{/snippet}
				</Tooltip>
			{:else}
				<Tooltip>
					{#snippet trigger({ props })}
						<a {...props} class="btn preset-filled-success-500" href="/sign-in"><LogInIcon /></a>
					{/snippet}
					{#snippet content()}
						<span>Sign In</span>
					{/snippet}
				</Tooltip>
			{/if}
		</nav>
	</header>
	
	<main class="p-4">
		{@render children()}
	</main>
</bits.Tooltip.Provider>


