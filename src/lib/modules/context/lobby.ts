import { Context } from 'runed';
import type { Tables } from '../supabase/types';

export const Lobby = new Context<{
	current:
		| (Tables<'lobby'> & {
				trial: Tables<'trial'> & { realm: Tables<'realm'> };
		  })
		| undefined;
}>('lobby');
