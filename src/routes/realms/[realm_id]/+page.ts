import { supabase } from "$lib/supabase/client";
import { error, redirect } from "@sveltejs/kit";

export async function load(event) {
	const data = await event.parent();
	if (!data.session) {
		redirect(303, "/sign-in");
	}
	const trials_response = await supabase
		.from("trials")
		.select("*")
		.eq("realm", event.params.realm_id);
	if (trials_response.error) {
		error(500, trials_response.error.message);
	}
	return {
		session: data.session,
		trials: trials_response.data,
	};
}
