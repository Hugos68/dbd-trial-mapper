<script lang="ts">
import { invalidateAll } from "$app/navigation";
import { supabase } from "$lib/supabase/client";
import { error } from "@sveltejs/kit";

async function submitJoinLobby(event: SubmitEvent) {
	if (!(event.target instanceof HTMLFormElement)) {
		return;
	}
	event.preventDefault();
	const formData = new FormData(event.target);
	const id = formData.get("id") as string | null;
	if (!id) {
		return;
	}
	const insertLobby = await supabase.from("lobby_participant").insert({
		lobby_id: id,
	});
	if (insertLobby.error) {
		error(500, insertLobby.error.message);
	}
	await invalidateAll();
}
</script>

<form class="input-group grid-cols-[1fr_auto]" onsubmit={submitJoinLobby}>
    <input name="id" class="ig-input" placeholder="Lobby ID" />
    <button class="ig-btn preset-filled-primary-500">
        Join
    </button>
</form>