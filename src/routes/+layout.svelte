<script lang="ts">
import { useDynamicWindowSize } from "$lib/hooks/use-dynamic-window-size.svelte.js";
import { useTopRightWindowPosition } from "$lib/hooks/use-top-right-window-position.js";
import { List, Plus, Settings, UserPlus } from "@lucide/svelte";
import { WebviewWindow } from "@tauri-apps/api/webviewWindow";
import "../app.css";

const { children, data } = $props();

async function setup() {
	useDynamicWindowSize();
	await useTopRightWindowPosition();
	await WebviewWindow.getCurrent().show();
}

setup();
</script>

<main class="p-2 grid gap-2">
    <div>
        {#if data.trial}
            <img class="rounded-md" src={data.trial.image_url} alt={data.trial.name} />
        {:else}
            <div class="h-48 grid place-items-center border rounded-md border-surface-500 border-dashed">
                <div class="grid place-items-center">
                <span>No trial chosen</span>
                    <a href="/realms" class="anchor">choose trial</a>
                </div>
            </div>
        {/if}
    </div>
    <div class="rounded-md">
        {@render children()}   
    </div>
    <div class="grid grid-cols-2 gap-2">
        <a href="/realms" class="btn preset-filled-primary-500">
            <List />
        </a>
        <a href="/lobby/create" class="btn preset-filled-primary-500">
            <Plus />
        </a>
        <a href="/lobby/join" class="btn preset-filled-primary-500">
            <UserPlus />
        </a> 
        <a href="/settings"class="btn preset-filled-primary-500">
            <Settings />
        </a>
    </div>
</main>
 