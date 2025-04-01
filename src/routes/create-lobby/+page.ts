import { redirect } from '@sveltejs/kit';

export async function load(event) {
	const data = await event.parent();
	if (data.lobby) {
		throw redirect(303, '/lobby');
	}
}
