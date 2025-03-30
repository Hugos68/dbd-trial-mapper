import { error } from '@sveltejs/kit';

export async function load(event) {
	const data = await event.parent();
	if (!data.lobby) {
		error(404, 'Lobby not found');
	}
	return {
		lobby: data.lobby
	};
}
