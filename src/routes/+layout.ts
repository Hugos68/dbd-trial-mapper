import { supabase } from "$lib/supabase/client";
import { error } from "@sveltejs/kit";

export async function load() {
	const sessionResponse = await supabase.auth.getSession();
	if (sessionResponse.error) {
		error(500, sessionResponse.error.message);
	}
	return {
		session: sessionResponse.data.session,
	};
}

export const prerender = true;
export const ssr = false;
