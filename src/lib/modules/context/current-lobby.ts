import { Context } from 'runed';
import type { Tables } from '../supabase/types';

export const CurrentLobby = new Context<{
	current:
		| (Tables<'lobby'> & {
				trial: Tables<'trial'> & { realm: Tables<'realm'> };
		  })
		| undefined;
}>('current-lobby');
