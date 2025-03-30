import type { User } from '@supabase/supabase-js';

declare global {
	namespace App {
		interface PageData {
			user: User;
		}
	}
}

export {};
