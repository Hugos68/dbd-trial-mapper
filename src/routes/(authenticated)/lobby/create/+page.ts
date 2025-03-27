import { create_lobby_schema } from "$lib/schemas/create-lobby.js";
import { superValidate } from "sveltekit-superforms";
import { valibot } from "sveltekit-superforms/adapters";

export const load = async () => {
	const form = await superValidate(null, valibot(create_lobby_schema));
	return {
		form: form,
	};
};
