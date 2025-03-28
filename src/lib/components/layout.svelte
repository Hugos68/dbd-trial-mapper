<script lang="ts">
import { signOut } from "$lib/supabase/auth/sign-out";
import { closeWindow } from "$lib/utilities/close-window";
import { LogOutIcon, SettingsIcon, XIcon } from "@lucide/svelte";
import type { Snippet } from "svelte";

interface Props {
	title: string;
	description: string;
	authenticated?: boolean;
	children: Snippet;
}

const { title, description, authenticated = false, children }: Props = $props();
</script>

<div class="p-4 flex flex-col gap-8 justify-between">
    <header>
        <div class="grid grid-cols-[1fr_auto] items-center">
            <h1 class="h1">{title}</h1>
            <div class="flex gap-1">
                {#if authenticated}
                    <a title="Settings" href="/preferences" class="block p-2 rounded hover:bg-surface-100-900"><SettingsIcon /></a>
                    <button title="Sign Out" class="p-2 rounded hover:bg-surface-100-900" onclick={signOut}><LogOutIcon /></button>
                {/if}
                <button title="Close" class="p-2 rounded hover:bg-surface-100-900" onclick={closeWindow}><XIcon /></button>
            </div>
        </div>
        <span class="text-sm text-surface-500">{description}</span>
    </header>
    <main>
        {@render children()}
    </main>    
</div>

