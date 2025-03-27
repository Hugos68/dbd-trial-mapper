import { supabase } from "$lib/supabase/client";
import { error } from "@sveltejs/kit";

export async function load() {
	const session_response = await supabase.auth.getSession();
	if (session_response.error) {
		error(500, session_response.error.message);
	}
	return {
		session: session_response.data.session,
	};
}

export const prerender = true;
export const ssr = false;
