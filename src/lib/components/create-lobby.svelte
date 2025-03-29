<script lang="ts">
import { invalidateAll } from "$app/navigation";
import { supabase } from "$lib/supabase/client";

async function createLobby() {
	const insertLobbyResponse = await supabase.from("lobby").insert({});
	if (insertLobbyResponse.error) {
		throw new Error(insertLobbyResponse.error.message);
	}
	await invalidateAll();
}
</script>

<button class="btn preset-filled-primary-500" onclick={createLobby}>Create Lobby</button>
