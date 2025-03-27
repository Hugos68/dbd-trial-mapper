import { supabase } from "$lib/supabase/client";
import { error, redirect } from "@sveltejs/kit";

export async function load(event) {
	const data = await event.parent();
	if (!data.session) {
		redirect(303, "/sign-in");
	}
	const lobby_response = await supabase
		.from("lobbies")
		.select("*")
		.eq("id", data.session.user.id)
		.single();
	if (lobby_response.error) {
		error(500, lobby_response.error.message);
	}
	return {
		lobby: lobby_response.data,
	};
}
