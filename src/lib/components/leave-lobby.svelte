<script lang="ts">
import { invalidateAll } from "$app/navigation";
import { supabase } from "$lib/supabase/client";
import type { Tables } from "$lib/supabase/types";
import type { User } from "@supabase/auth-js";

interface Props {
	lobby: Tables<"lobby">;
	user: User;
}

const { lobby, user }: Props = $props();

async function leaveLobby(lobby: Tables<"lobby">) {
	if (lobby.user_id === user.id) {
		await supabase
			.from("lobby")
			.delete()
			.eq("id", lobby.id)
			.eq("user_id", user.id);
	} else {
		await supabase.from("lobby_participant").delete().eq("user_id", user.id);
	}
	await invalidateAll();
}
</script>

<button class="btn preset-filled-error-500" onclick={() => leaveLobby(lobby)}>Leave Lobby</button>
