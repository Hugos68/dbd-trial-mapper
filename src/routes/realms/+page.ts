import { supabase } from "$lib/supabase/client";
import { error } from "@sveltejs/kit";

export async function load() {
	const realms_response = await supabase.from("realms").select("*");
	if (realms_response.error) {
		error(500, realms_response.error.message);
	}
	return {
		realms: realms_response.data,
	};
}
