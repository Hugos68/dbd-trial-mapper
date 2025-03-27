import { supabase } from "$lib/supabase/client";
import { error } from "@sveltejs/kit";

export async function load(event) {
	const data = await event.parent();
	const lobby_member_response = await supabase
		.from("lobby_member")
		.select("*, lobby (*, trial (*))")
		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		.eq("user_id", data.session!.user.id)
		.single();
	if (lobby_member_response.error) {
		error(500, lobby_member_response.error.message);
	}
	return {
		lobby: lobby_member_response.data.lobby,
		session: data.session,
	};
}
