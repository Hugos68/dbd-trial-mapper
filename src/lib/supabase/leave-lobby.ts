import { invalidateAll } from "$app/navigation";
import { supabase } from "./client";
import type { Database } from "./types";

export async function leaveLobby(
	lobby: Database["public"]["Tables"]["lobby"]["Row"],
) {
	const userResponse = await supabase.auth.getUser();
	if (userResponse.error) {
		throw new Error(userResponse.error.message);
	}
	if (lobby.user_id === userResponse.data.user.id) {
		await supabase
			.from("lobby")
			.delete()
			.eq("id", lobby.id)
			.eq("user_id", userResponse.data.user.id);
	} else {
		await supabase
			.from("lobby_participant")
			.delete()
			.eq("user_id", userResponse.data.user.id);
	}
	await invalidateAll();
}
