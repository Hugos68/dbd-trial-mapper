<script lang="ts">
import { closeWindow } from "$lib/utilities/close-window";
import { HomeIcon, SettingsIcon, XIcon } from "@lucide/svelte";
import type { Snippet } from "svelte";

interface Props {
	children: Snippet;
}

const { children }: Props = $props();
</script>

<div class="grid gap-4">
  <header class="flex gap-1 p-2">
    <a title="Home" class="p-2 rounded hover:bg-surface-100-900" href="/"><HomeIcon /></a>
    <a title="Preferences"  class=" p-2 rounded hover:bg-surface-100-900" href="/preferences"><SettingsIcon /></a>
    <button title="Close" class="ml-auto p-2 rounded hover:bg-surface-100-900" onclick={closeWindow}><XIcon /></button>
  </header>

  <main class="p-2">
      {@render children()}
  </main>    
</div>
