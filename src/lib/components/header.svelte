<script lang="ts">
	import { page } from "$app/state";
	import { close } from "$lib/modules/tauri/window/close";
    import { MapIcon, XIcon } from "@lucide/svelte";
</script>

<header data-tauri-drag-region class="flex justify-between items-center gap-2 p-4">
    <div class="flex items-center gap-2">
        <MapIcon />
        <div class="grid">
            <span class="font-bold">Trial Sync</span>
            <span class="text-neutral-500 text-xs">User ID: {page.data.user.id}</span>
        </div>
    </div>
    <button class="cursor-pointer hover:bg-red-500/50 p-2 rounded" onclick={close}><XIcon /></button>
</header>   