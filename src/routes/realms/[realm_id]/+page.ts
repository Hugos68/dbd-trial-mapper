import { supabase } from "$lib/supabase/client";
import { error } from "@sveltejs/kit";

export async function load(event) {
	const trials_response = await supabase
		.from("trials")
		.select("*")
		.eq("realm", event.params.realm_id);
	if (trials_response.error) {
		error(500, trials_response.error.message);
	}
	return {
		trials: trials_response.data,
	};
}
