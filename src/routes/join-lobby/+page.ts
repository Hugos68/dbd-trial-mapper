import { JoinLobbySchema } from '$lib/modules/schemas/join-lobby-schema';
import { redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';

export async function load(event) {
	const data = await event.parent();
	if (data.lobby) {
		throw redirect(303, '/my-lobby');
	}
	const form = await superValidate(valibot(JoinLobbySchema));
	return {
		form: form,
	};
}
