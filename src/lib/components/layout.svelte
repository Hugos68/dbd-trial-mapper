<script lang="ts">
import { closeWindow } from "$lib/utilities/close-window";
import { SettingsIcon, XIcon } from "@lucide/svelte";
import type { Snippet } from "svelte";

interface Props {
	title: string;
	children: Snippet;
}

const { title, children }: Props = $props();
</script>

<div class="p-4 flex flex-col gap-8 justify-between">
    <header>
        <div class="grid grid-cols-[1fr_auto] items-center">
            <h1 class="h1">{title}</h1>
            <nav class="flex gap-2 items-center">
                <a href="/preferences" class="p-2 rounded hover:bg-surface-100-900" onclick={closeWindow}><SettingsIcon /></a>
                <button title="Close" class="p-2 rounded hover:bg-surface-100-900" onclick={closeWindow}><XIcon /></button>
            </nav>
        </div>
    </header>
    <main>
        {@render children()}
    </main>    
</div>

