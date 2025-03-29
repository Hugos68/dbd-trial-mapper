import { supabase } from "$lib/supabase/client";
import type { User } from "@supabase/supabase-js";

export async function getLobbyFromUser(user: User) {
	const hostingLobby = await supabase
		.from("lobby")
		.select("*, trial (*)")
		.eq("user_id", user.id)
		.maybeSingle();
	if (hostingLobby.data) {
		return hostingLobby;
	}
	const participatingLobby = await supabase
		.from("lobby_participant")
		.select("*, lobby (*, trial (*))")
		.eq("user_id", user.id)
		.maybeSingle();
	return {
		error: participatingLobby.error,
		data: participatingLobby.data?.lobby,
	};
}
