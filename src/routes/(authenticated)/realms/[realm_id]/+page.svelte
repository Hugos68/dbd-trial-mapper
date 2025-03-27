<script lang="ts">
import { invalidate, invalidateAll } from "$app/navigation";
import { supabase } from "$lib/supabase/client.js";
import { WebviewWindow } from "@tauri-apps/api/webviewWindow";

const { data } = $props();

async function select_trial(trial: (typeof data.trials)[number]) {
	const lobby_member_response = await supabase
		.from("lobby_member")
		.select("*, lobby (*)")
		.eq("user_id", data.session.user.id)
		.eq("type", "host")
		.single();
	console.log(lobby_member_response);
	if (lobby_member_response.error) {
		throw new Error(lobby_member_response.error.message);
	}
	const update_lobby_response = await supabase
		.from("lobby")
		.update({
			trial_id: trial.id,
		})
		.eq("id", lobby_member_response.data.lobby.id);
	if (update_lobby_response.error) {
		throw new Error(update_lobby_response.error.message);
	}
	const overlay = await WebviewWindow.getByLabel("overlay");
	if (!overlay) {
		throw new Error("Overlay not found");
	}
	console.log("Emitting update");
	await overlay.emit("update");
}
</script>

<ol class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
	{#each data.trials as trial (trial.id)}
		<li>
			<button onclick={() => select_trial(trial)} class="btn preset-filled w-full aspect-square">{trial.name}</button>
		</li>
	{/each}
</ol>
