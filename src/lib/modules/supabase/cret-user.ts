import { error } from '@sveltejs/kit';
import { supabase } from './client';

export async function cretUser() {
	const user = await supabase.auth.getUser();
	if (user.error || !user.data.user) {
		const user = await supabase.auth.signInAnonymously();
		if (user.error) {
			error(500, user.error.message);
		}
		if (!user.data.user) {
			error(500, 'No user found after sign in.');
		}
		return user.data.user;
	}
	return user.data.user;
}
