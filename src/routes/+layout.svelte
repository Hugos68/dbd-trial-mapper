<script lang="ts">
import { page } from "$app/state";
import { useDynamicHeight } from "$lib/hooks/use-dynamic-height.svelte";
import { useShowWindow } from "$lib/hooks/use-show-window";
import { useWindowPosition } from "$lib/hooks/use-window-position";
import { closeWindow } from "$lib/utilities/close-window";
import { LogOutIcon, SettingsIcon, XIcon } from "@lucide/svelte";
import { Position } from "@tauri-apps/plugin-positioner";
import { signOut } from "$lib/supabase/auth/sign-out";
import type { Snippet } from "svelte";
import "../app.css";

interface Props {
	children: Snippet;
}

const { children }: Props = $props();

useDynamicHeight();
useWindowPosition(Position.TopRight);
useShowWindow();
</script>


<div class="p-4 grid gap-16">
    <header>
        <div class="grid grid-cols-[1fr_auto] items-center">
            <h1 class="h1">{page.data.title}</h1>
            <div class="flex gap-1">
                {#if page.data.session}
                    <a title="Settings" href="/preferences" class="block p-2 rounded hover:bg-surface-100-900"><SettingsIcon /></a>
                    <button title="Sign Out" class="p-2 rounded hover:bg-surface-100-900" onclick={signOut}><LogOutIcon /></button>
                {/if}
                <button title="Close" class="p-2 rounded hover:bg-surface-100-900" onclick={closeWindow}><XIcon /></button>
            </div>
        </div>
        <span class="text-sm text-surface-500">{page.data.description}</span>
    </header>
    <main>
        {@render children()}
    </main>    
</div>


