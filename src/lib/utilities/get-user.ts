import { supabase } from "$lib/supabase/client";
import { error } from "@sveltejs/kit";

async function createUser() {
	const user = await supabase.auth.signInAnonymously();
	if (user.error) {
		error(500, user.error.message);
	}
	if (!user.data.user) {
		error(500, "Failed to create anonymous user");
	}
	return user.data.user;
}

export async function getUser() {
	const user = await supabase.auth.getUser();
	if (user.error || !user.data.user) {
		return await createUser();
	}
	return user.data.user;
}
