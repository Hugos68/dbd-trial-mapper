<script lang="ts">
import { invalidateAll } from "$app/navigation";
import { supabase } from "$lib/supabase/client";
import { error } from "@sveltejs/kit";

async function createLobby() {
	const insertLobby = await supabase.from("lobby").insert({});
	if (insertLobby.error) {
		error(500, insertLobby.error.message);
	}
	await invalidateAll();
}
</script>

<button class="btn preset-filled-primary-500" onclick={createLobby}>Create Lobby</button>
