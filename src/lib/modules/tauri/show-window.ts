import { Window } from '@tauri-apps/api/window';

export async function showWindow() {
	const window = Window.getCurrent();
	await window.show();
}
