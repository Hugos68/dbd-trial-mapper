import { getLobbyFromUser } from "$lib/utilities/get-lobby-from-user";
import { error, redirect } from "@sveltejs/kit";

export async function load(event) {
	const data = await event.parent();
	const lobby = await getLobbyFromUser(data.user);
	if (lobby.error) {
		error(500, lobby.error.message);
	}
	if (!lobby.data) {
		redirect(303, "/");
	}
	return {
		lobby: lobby.data,
	};
}
