import { redirect } from '@sveltejs/kit';

export async function load(event) {
	const data = await event.parent();
	if (!data.lobby) {
		redirect(303, '/');
	}
	return {
		lobby: data.lobby,
	};
}
