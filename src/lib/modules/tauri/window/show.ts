import { Window } from '@tauri-apps/api/window';

export async function show() {
	const window = Window.getCurrent();
	await window.show();
}
