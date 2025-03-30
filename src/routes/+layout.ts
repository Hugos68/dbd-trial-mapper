import { cretUser } from '$lib/modules/supabase/cret-user';
import { getUserLobby } from '$lib/modules/supabase/get-user-lobby';
import { error } from '@sveltejs/kit';

export const prerender = true;
export const ssr = false;

export async function load() {
	const user = await cretUser();
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
