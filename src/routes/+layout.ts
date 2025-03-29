import { getUser } from "$lib/utilities/get-user";

export async function load() {
	const user = await getUser();
	return {
		user: user,
	};
}

export const prerender = true;
export const ssr = false;
