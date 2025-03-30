import { superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';
import { CreateLobbySchema } from './create-lobby-schema.js';

export async function load() {
	const form = await superValidate(valibot(CreateLobbySchema));
	return {
		form: form
	};
}
