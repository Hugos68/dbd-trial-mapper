import { OverlaySettingsSchema } from '$lib/modules/schemas/overlay-settings-schema.js';
import { overlaySettings } from '$lib/modules/ui/overlay-settings.js';
import { superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';

export async function load(event) {
	const data = await event.parent();
	const form = await superValidate(
		overlaySettings.current,
		valibot(OverlaySettingsSchema),
	);
	return {
		lobby: data.lobby,
		form: form,
	};
}
