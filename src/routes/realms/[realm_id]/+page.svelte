<script lang="ts">
import { goto, invalidate } from "$app/navigation";
import Layout from "$lib/components/layout.svelte";
import { supabase } from "$lib/supabase/client.js";
import { WebviewWindow } from "@tauri-apps/api/webviewWindow";

const { data } = $props();

async function select_trial(trial: (typeof data.trials)[number]) {
	const update_lobby_response = await supabase
		.from("lobbies")
		.update({
			trial: trial.id,
		})
		.eq("id", data.session.user.id)
		.select()
		.single();
	if (update_lobby_response.error) {
		throw new Error(update_lobby_response.error.message);
	}
	const overlay = await WebviewWindow.getByLabel("overlay");
	if (!overlay) {
		return;
	}
	await overlay.emit("update");
}
</script>

<Layout>
    <ol class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {#each data.trials as trial (trial.id)}
            <li>
                <button onclick={() => select_trial(trial)} class="btn preset-filled w-full aspect-square">{trial.name}</button>
            </li>
        {/each}
    </ol>
</Layout>
