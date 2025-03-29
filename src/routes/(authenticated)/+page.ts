import { supabase } from "$lib/supabase/client";
import { error } from "@sveltejs/kit";

export async function load(event) {
	const data = await event.parent();
	const trials = await supabase.from("trial").select("*, realm (*)");
	if (trials.error) {
		error(500, trials.error.message);
	}
	const hostingLobbyResponse = await supabase
		.from("lobby")
		.select("*, trial (*)")
		.eq("user_id", data.session.user.id)
		.maybeSingle();
	if (hostingLobbyResponse.error) {
		error(500, hostingLobbyResponse.error.message);
	}
	const participatingLobbyResponse = await supabase
		.from("lobby_participant")
		.select("*, lobby (*, trial (*))")
		.eq("user_id", data.session.user.id)
		.maybeSingle();
	if (participatingLobbyResponse.error) {
		error(500, participatingLobbyResponse.error.message);
	}
	const lobby =
		hostingLobbyResponse.data ?? participatingLobbyResponse.data?.lobby;
	return {
		lobby: lobby,
		trials: trials.data,
	};
}
