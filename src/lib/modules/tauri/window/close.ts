import { Window } from '@tauri-apps/api/window';

export async function close() {
	const window = Window.getCurrent();
	await window.close();
}
