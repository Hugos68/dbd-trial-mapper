<script lang="ts">
import { useRealtimeRecord } from "$lib/hooks/use-realtime-record.svelte";
import { supabase } from "$lib/supabase/client";
import { promisifyImage } from "$lib/utilities/promisify-image";
import { error } from "@sveltejs/kit";

const { data } = $props();

const lobby = useRealtimeRecord({
	record: data.lobby,
	table: "lobby",
	async transformPayload(data) {
		const lobby = await supabase
			.from("lobby")
			.select("*, trial (*)")
			.eq("id", data.id)
			.single();
		if (lobby.error) {
			error(500, lobby.error.message);
		}
		return lobby.data;
	},
});
</script>

<div class="group">
    {#await promisifyImage(lobby.current.trial.image_url)}
        <div class="grid place-items-center py-32">
            <span>Loading image...</span>
        </div>
    {:then imageUrl}
        <a  href="/" class="translate-y-16 group-hover:translate-y-0 btn preset-filled-primary-500 absolute left-1/2 -translate-x-1/2 bottom-4">
            Back to Lobby
        </a>
        <img src={imageUrl} alt={data.lobby.trial.name} class="w-full h-full object-cover" />
    {:catch error}
        <div class="grid place-items-center py-32">
            <span>Error loading image</span>
            <span class="text-sm text-surface-500">{error.message}</span>
        </div>
    {/await}
</div>