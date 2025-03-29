import { supabase } from "$lib/supabase/client";
import { getLobbyFromUser } from "$lib/utilities/get-lobby-from-user.js";
import { error } from "@sveltejs/kit";

export async function load(event) {
	const data = await event.parent();
	const trials = await supabase.from("trial").select("*, realm (*)");
	if (trials.error) {
		error(500, trials.error.message);
	}
	const lobby = await getLobbyFromUser(data.user);
	if (lobby.error) {
		error(500, lobby.error.message);
	}
	return {
		lobby: lobby.data,
		trials: trials.data,
	};
}
