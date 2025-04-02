import { Window } from '@tauri-apps/api/window';

export async function minimize() {
	const window = Window.getCurrent();
	await window.minimize();
}
