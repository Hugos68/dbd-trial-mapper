import { supabase } from '$lib/modules/supabase/client';
import { getOrCreateUser } from '$lib/modules/supabase/get-or-create-user';
import { error } from '@sveltejs/kit';

export const prerender = true;
export const ssr = false;

export async function load() {
	console.log('Loading layout');
	const user = await getOrCreateUser();
	const lobbyResponse = await supabase
		.from('lobby_member')
		.select('*, lobby (*, trial (*, realm (*)))')
		.eq('user_id', user.id)
		.maybeSingle();
	if (lobbyResponse.error) {
		error(500, lobbyResponse.error.details);
	}
	return {
		user: user,
		lobby: lobbyResponse.data?.lobby,
	};
}
