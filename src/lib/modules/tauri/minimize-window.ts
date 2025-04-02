import { Window } from '@tauri-apps/api/window';

export async function minimizeWindow() {
	const window = Window.getCurrent();
	await window.minimize();
}
