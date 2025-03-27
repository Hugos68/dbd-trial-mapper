<script lang="ts">
import { invalidateAll } from "$app/navigation";
import Tooltip from "$lib/components/tooltip.svelte";
import { supabase } from "$lib/supabase/client";
import {
	ExternalLinkIcon,
	EyeIcon,
	HomeIcon,
	LogOutIcon,
	MapIcon,
	PlusIcon,
} from "@lucide/svelte";
import { WebviewWindow } from "@tauri-apps/api/webviewWindow";
import * as bits from "bits-ui";

const { children, data } = $props();

async function toggle_overlay() {
	const overlay = await WebviewWindow.getByLabel("overlay");
	if (!overlay) {
		return;
	}
	if (await overlay.isVisible()) {
		await overlay.hide();
	} else {
		await overlay.show();
	}
}

async function sign_out() {
	await supabase.auth.signOut();
	await invalidateAll();
}
</script>
    
<bits.Tooltip.Provider>
    <header class="preset-filled-surface-100-900 p-4 rounded-b-md sticky top-0 flex gap-2">
        <nav class="contents">
            <Tooltip>
                {#snippet trigger({ props })}
                    <a {...props} class="btn preset-filled" href="/"><HomeIcon /></a>
                {/snippet}
                {#snippet content()}
                    <span>Home</span>
                {/snippet}
            </Tooltip>
            {#if data.lobby}
                <Tooltip>
                    {#snippet trigger({ props })}
                        <button {...bits.mergeProps(props, { onclick: () => toggle_overlay() })} class="btn preset-filled"><EyeIcon /></button>
                    {/snippet}
                    {#snippet content()}
                        <span>Toggle Overlay</span>
                    {/snippet}
                </Tooltip>
                <Tooltip>
                    {#snippet trigger({ props })}
                        <a {...props} class="btn preset-filled" href="/realms"><MapIcon /></a>
                    {/snippet}
                    {#snippet content()}
                        <span>Browse Realms</span>
                    {/snippet}
                </Tooltip>
            {:else}
                <Tooltip>
                    {#snippet trigger({ props })}
                        <a {...props} class="btn preset-filled" href="/lobby/create"><PlusIcon /></a>
                    {/snippet}
                    {#snippet content()}
                        <span>Create Lobby</span>
                    {/snippet}
                </Tooltip>
                <Tooltip>
                    {#snippet trigger({ props })}
                        <a {...props} class="btn preset-filled" href="/lobby/join"><ExternalLinkIcon /></a>
                    {/snippet}
                    {#snippet content()}
                        <span>Join Lobby</span>
                    {/snippet}
                </Tooltip>
            {/if}
        </nav>
        <Tooltip>
            {#snippet trigger({ props })}
                <button {...props} class="ml-auto btn preset-filled-error-500" onclick={sign_out}><LogOutIcon /></button>	
            {/snippet}
            {#snippet content()}
                <span>Sign Out</span>
            {/snippet}
        </Tooltip>
    </header>
    
    <main class="p-4">
        {@render children()}
    </main>
</bits.Tooltip.Provider>

    
    