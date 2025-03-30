import { superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';
import { JoinLobbySchema } from './join-lobby-schema';

export async function load() {
	const form = await superValidate(valibot(JoinLobbySchema));
	return {
		form: form
	};
}
