import type { User } from '@supabase/supabase-js';
import { supabase } from './client';

export async function getUserLobby(user: User) {
	const hostingLobby = await supabase
		.from('lobby')
		.select('*, trial (*, realm (*))')
		.eq('user_id', user.id)
		.maybeSingle();
	if (hostingLobby.data) {
		return hostingLobby;
	}
	const participatingLobby = await supabase
		.from('lobby_participant')
		.select('*, lobby (*, trial (*, realm (*)))')
		.eq('user_id', user.id)
		.maybeSingle();
	return {
		error: participatingLobby.error,
		data: participatingLobby.data?.lobby
	};
}
