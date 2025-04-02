import { PersistedState } from 'runed';
import type { OverlaySettings } from '../schemas/overlay-settings-schema';

export const overlaySettings = new PersistedState<OverlaySettings>(
	'overlay-settings',
	{
		size: 250,
		position: 'top-left',
		opacity: 100,
		visible: false,
	},
);
