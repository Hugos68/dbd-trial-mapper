import { redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';
import * as v from 'valibot';

export async function load(event) {
	const data = await event.parent();
	if (data.lobby) {
		throw redirect(303, '/lobby');
	}
	const form = await superValidate(valibot(v.object({})));
	return {
		form,
	};
}
