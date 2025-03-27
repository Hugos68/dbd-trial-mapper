import { supabase } from "$lib/supabase/client.js";
import { redirect } from "@sveltejs/kit";

export async function load(event) {
	const data = await event.parent();
	if (!data.session) {
		redirect(303, "/sign-in");
	}
	const lobby_member_response = await supabase
		.from("lobby_member")
		.select("*, lobby (*)")
		.eq("user_id", data.session.user.id)
		.single();
	return {
		lobby: lobby_member_response.data,
		session: data.session,
	};
}
