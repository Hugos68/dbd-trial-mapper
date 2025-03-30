import { WebviewWindow } from '@tauri-apps/api/WebviewWindow';

export async function close() {
	const window = WebviewWindow.getCurrent();
	await window.close();
}
