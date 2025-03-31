import { CreateLobbySchema } from '$lib/modules/schemas/create-lobby-schema';
import { redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';

export async function load(event) {
	const data = await event.parent();
	if (data.lobby) {
		throw redirect(303, '/my-lobby');
	}
	const form = await superValidate(valibot(CreateLobbySchema));
	return {
		form: form,
	};
}
