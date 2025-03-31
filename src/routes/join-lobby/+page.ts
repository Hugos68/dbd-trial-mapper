import { JoinLobbySchema } from '$lib/modules/schemas/join-lobby-schema';
import { superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';

export async function load() {
	const form = await superValidate(valibot(JoinLobbySchema));
	return {
		form: form
	};
}
