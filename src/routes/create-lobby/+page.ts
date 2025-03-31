import { superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';
import { CreateLobbySchema } from '../../lib/modules/schemas/create-lobby-schema.js';

export async function load() {
	const form = await superValidate(valibot(CreateLobbySchema));
	return {
		form: form
	};
}
