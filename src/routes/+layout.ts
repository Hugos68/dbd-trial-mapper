import { getOrCreateUser } from '$lib/modules/supabase/get-or-create-user';
import { getUserLobby } from '$lib/modules/supabase/get-user-lobby';
import { error } from '@sveltejs/kit';

export const prerender = true;
export const ssr = false;

export async function load() {
	const user = await getOrCreateUser();
	const lobby = await getUserLobby(user);
	if (lobby.error) {
		error(500, lobby.error.message);
	}
	console.log(lobby);
	return {
		user: user,
		lobby: lobby.data
	};
}
