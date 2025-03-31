import { WebviewWindow } from '@tauri-apps/api/webviewWindow';

export async function close() {
	const window = WebviewWindow.getCurrent();
	await window.close();
}
