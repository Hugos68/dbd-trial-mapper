import { cretUser } from '$lib/modules/supabase/cret-user';

export const prerender = true;
export const ssr = false;

export async function load() {
	const user = await cretUser();
	return {
		user: user
	};
}
