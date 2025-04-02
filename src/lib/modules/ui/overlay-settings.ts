import { PersistedState } from 'runed';
import { Position } from '@tauri-apps/plugin-positioner';
import type { OverlaySettings } from '../schemas/overlay-settings-schema';

export const overlaySettings = new PersistedState<OverlaySettings>(
	'overlay-settings',
	{
		size: 250,
		position: Position.TopLeft,
		opacity: 100,
		visible: false,
	},
);
