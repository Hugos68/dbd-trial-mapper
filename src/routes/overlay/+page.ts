import { overlaySettings } from '$lib/modules/ui/overlay-settings.js';
import { WebviewWindow } from '@tauri-apps/api/webviewWindow';

export async function load(event) {
	const data = await event.parent();
	if (!data.lobby) {
		await WebviewWindow.getCurrent().hide();
	} else if (overlaySettings.current.visible) {
		await WebviewWindow.getCurrent().show();
	}
	return {
		lobby: data.lobby,
	};
}
