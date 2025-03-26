<script lang="ts">
import { useDynamicWindowSize } from "$lib/hooks/use-dynamic-window-size.svelte.js";
import { settings } from "$lib/settings.svelte.js";
import { List, Plus, Settings, UserPlus } from "@lucide/svelte";
import { WebviewWindow } from "@tauri-apps/api/webviewWindow";
import { register, unregisterAll } from "@tauri-apps/plugin-global-shortcut";
import "../app.css";
import { Position, moveWindow } from "@tauri-apps/plugin-positioner";

const { children, data } = $props();

async function setup() {
	useDynamicWindowSize();
	await moveWindow(Position.TopRight);
	await unregisterAll();
	await register("CommandOrControl+Shift+Q", (event) => {
		if (event.state === "Pressed") {
			settings.zen = !settings.zen;
		}
	});
	await register("CommandOrControl+Shift+W", async (event) => {
		if (event.state === "Pressed") {
			if (await WebviewWindow.getCurrent().isVisible()) {
				await WebviewWindow.getCurrent().hide();
			} else {
				await WebviewWindow.getCurrent().show();
			}
		}
	});
	await WebviewWindow.getCurrent().show();
}

setup();
</script>

<main class={{ "p-2 space-y-2": !settings.zen }}>
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
    {#if !settings.zen}
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
    {/if}
</main>
 