<script lang="ts">
import { invalidateAll } from "$app/navigation";
import { supabase } from "$lib/supabase/client";
import { error } from "@sveltejs/kit";

async function createLobby() {
	const insertLobbyResponse = await supabase.from("lobby").insert({});
	if (insertLobbyResponse.error) {
		error(500, insertLobbyResponse.error.message);
	}
	await invalidateAll();
}
</script>

<button class="btn preset-filled-primary-500" onclick={createLobby}>Create Lobby</button>
