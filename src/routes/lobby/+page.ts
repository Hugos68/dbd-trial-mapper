import { LeaveLobbySchema } from '$lib/modules/schemas/leave-lobby-schema';
import { redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';

export async function load(event) {
	const data = await event.parent();
	if (!data.lobby) {
		redirect(303, '/');
	}
	const form = await superValidate(
		{
			'lobby-id': data.lobby.id,
			'user-id': data.user.id
		},
		valibot(LeaveLobbySchema)
	);
	return {
		lobby: data.lobby,
		form: form
	};
}
