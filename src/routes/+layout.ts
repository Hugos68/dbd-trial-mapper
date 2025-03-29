import { supabase } from "$lib/supabase/client";
import { error } from "@sveltejs/kit";

export async function load() {
	const user = await supabase.auth.getUser();
	if (user.error || !user.data.user) {
		const user = await supabase.auth.signInAnonymously();
		if (user.error) {
			error(500, user.error.message);
		}
		if (!user.data.user) {
			error(500, "Failed to create anonymous user");
		}
		return {
			user: user.data.user,
		};
	}
	return {
		user: user.data.user,
	};
}

export const prerender = true;
export const ssr = false;
