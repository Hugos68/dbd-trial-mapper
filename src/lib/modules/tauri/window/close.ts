import { Window } from '@tauri-apps/api/window';

export async function close() {
	for (const window of await Window.getAll()) {
		await window.close();
	}
}
