<script lang="ts">
    import { ElementRect } from 'runed';
    import { moveWindow } from '@tauri-apps/plugin-positioner';
	import { WebviewWindow } from '@tauri-apps/api/webviewWindow';
	import { PhysicalSize } from '@tauri-apps/api/dpi';
	import { overlaySettings } from '$lib/modules/ui/overlay-settings.js';
	import { useRealtimeRecord } from '$lib/modules/hooks/use-realtime-record.svelte.js';
	import { supabase } from '$lib/modules/supabase/client.js';
	import { page } from '$app/state';

    const { data } = $props();

    const lobby = $derived(
        useRealtimeRecord({
            record: data.lobby,
            table: "lobby",
            async transformPayload(data) {
                const lobbyResponse = await supabase
                    .from("lobby")
                    .select("*, trial (*, realm (*))")
                    .eq("id", data.id)
                    .single();
                if (lobbyResponse.error) {
                    throw new Error(lobbyResponse.error.message);
                }
                return lobbyResponse.data;
            },
        }),
    );
    const documentRect = new ElementRect(() => document.documentElement);

    // @ts-expect-error
    $effect(async () => {
        const window = WebviewWindow.getCurrent();
        if (overlaySettings.current.visible) {
            await window.show();
        } else {
            const window = WebviewWindow.getCurrent();
            await window.hide();
        }
    });

    // @ts-expect-error
    $effect(async () => {
        await moveWindow(overlaySettings.current.position);
    });

    // @ts-expect-error
    $effect(async () => {
        const window = WebviewWindow.getCurrent();
        await window.setSize(new PhysicalSize(overlaySettings.current.width, Math.ceil(documentRect.current.height)));
        await moveWindow(overlaySettings.current.position);
    });
</script>

<div class="h-fit">
    {#if lobby.current}
        <img src={lobby.current.trial.image_url} alt={lobby.current.trial.name} />
    {:else}
        <p>No lobby</p>
    {/if}
</div>
