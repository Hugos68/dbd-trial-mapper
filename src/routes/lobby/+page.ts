import { UpdateLobbySchema } from '$lib/modules/schemas/update-lobby-schema.js';
import { supabase } from '$lib/modules/supabase/client.js';
import { error, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';
import * as v from 'valibot';

export async function load(event) {
	const data = await event.parent();
	if (!data.lobby) {
		redirect(303, '/');
	}
	const trials = await supabase.from('trial').select('*, realm (*)');
	if (trials.error) {
		error(500, trials.error.details);
	}
	const updateLobbyForm = await superValidate(
		data.lobby,
		valibot(UpdateLobbySchema),
	);
	const leaveLobbyForm = await superValidate(valibot(v.object({})));
	return {
		lobby: data.lobby,
		trials: trials.data,
		updateLobbyForm: updateLobbyForm,
		leaveLobbyForm: leaveLobbyForm,
	};
}
