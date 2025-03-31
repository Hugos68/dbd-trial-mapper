import type { Tables } from '$lib/modules/supabase/types';
import type { User } from '@supabase/supabase-js';

declare global {
	namespace App {
		interface PageData {
			user: User;
			lobby?: Tables['lobby'] & { trial: Tables<'trial'> }
		}
	}
}

export {};
