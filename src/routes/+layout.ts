import { supabase } from "$lib/supabase/client";
import { getUser } from "$lib/utilities/get-user";
import { error } from "@sveltejs/kit";

export async function load() {
	const user = await getUser();
	const preference = await supabase
		.from("preference")
		.select("*")
		.eq("user_id", user.id)
		.single();
	if (preference.error) {
		error(500, preference.error.message);
	}
	return {
		user: user,
		preference: preference.data,
	};
}

export const prerender = true;
export const ssr = false;
