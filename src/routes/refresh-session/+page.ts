import { invalidateAll } from '$app/navigation';
import { supabase } from '$lib/modules/supabase/client';
import { redirect } from '@sveltejs/kit';

export async function load() {
	await supabase.auth.signOut();
	await invalidateAll();
	redirect(303, '/');
}
