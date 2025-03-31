import { CreateLobbySchema } from '$lib/modules/schemas/create-lobby-schema';
import { superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';

export async function load() {
	const form = await superValidate(valibot(CreateLobbySchema));
	return {
		form: form
	};
}
