import { useRealtimeLobby } from "$lib/hooks/use-realtime-lobby.svelte";
import { supabase } from "$lib/supabase/client";
import { error, redirect } from "@sveltejs/kit";

export async function load(event) {
	const data = await event.parent();
	if (!data.session) {
		redirect(303, "/sign-in");
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
		session: data.session,
	};
}
