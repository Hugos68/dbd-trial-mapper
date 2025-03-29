<script lang="ts">
import { closeWindow } from "$lib/utilities/close-window";
import { XIcon } from "@lucide/svelte";
import type { Snippet } from "svelte";

interface Props {
	title: string;
	description: string;
	children: Snippet;
}

const { title, description, children }: Props = $props();
</script>

<div class="p-4 flex flex-col gap-8 justify-between">
    <header>
        <div class="grid grid-cols-[1fr_auto] items-center">
            <h1 class="h1">{title}</h1>
            <button title="Close" class="p-2 rounded hover:bg-surface-100-900" onclick={closeWindow}><XIcon /></button>
        </div>
        <span class="text-sm text-surface-500">{description}</span>
    </header>
    <main>
        {@render children()}
    </main>    
</div>

