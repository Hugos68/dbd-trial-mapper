import { supabase } from "$lib/supabase/client";
import { error } from "@sveltejs/kit";

export async function load(event) {
	const trials = await supabase.from("trial").select("*, realm (*)");
	if (trials.error) {
		error(500, trials.error.message);
	}
	return {
		trials: trials.data,
	};
}
