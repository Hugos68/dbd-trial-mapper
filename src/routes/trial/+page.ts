import { supabase } from "$lib/supabase/client";
import { error, redirect } from "@sveltejs/kit";

export async function load(event) {
	const data = await event.parent();
	const hostingLobbyResponse = await supabase
		.from("lobby")
		.select("*, trial (*)")
		.eq("user_id", data.user.id)
		.maybeSingle();
	if (hostingLobbyResponse.error) {
		error(500, hostingLobbyResponse.error.message);
	}
	const participatingLobbyResponse = await supabase
		.from("lobby_participant")
		.select("*, lobby (*, trial (*))")
		.eq("user_id", data.user.id)
		.maybeSingle();
	if (participatingLobbyResponse.error) {
		error(500, participatingLobbyResponse.error.message);
	}
	const lobby =
		hostingLobbyResponse.data ?? participatingLobbyResponse.data?.lobby;

	if (!lobby) {
		redirect(303, "/");
	}

	return {
		lobby: lobby,
	};
}
