<script lang="ts">
import { page } from "$app/state";
import { useDynamicHeight } from "$lib/hooks/use-dynamic-height.svelte";
import { useShowWindow } from "$lib/hooks/use-show-window";
import { useWindowPosition } from "$lib/hooks/use-window-position";
import { closeWindow } from "$lib/utilities/close-window";
import { LogOutIcon, XIcon } from "@lucide/svelte";
import { Position } from "@tauri-apps/plugin-positioner";
import type { Snippet } from "svelte";
import "../app.css";
import { signOut } from "$lib/supabase/auth/sign-out";

interface Props {
	children: Snippet;
}

const { children }: Props = $props();

useDynamicHeight();
useWindowPosition(Position.TopRight);
useShowWindow();
</script>


<div class="p-4 grid gap-16">
    <header class="flex justify-between items-center">
        {#if page.data.title}
            <h1 class="h1">{page.data.title}</h1>
        {/if}
        <div class="h-fit flex gap-2">
            {#if page.data.session}
                <button class="btn preset-filled-error-500" onclick={signOut}><LogOutIcon /></button>
            {/if}
            <button class="btn preset-filled-error-500" onclick={closeWindow}><XIcon /></button>
        </div>
    </header>
    <main>
        {@render children()}
    </main>    
</div>


