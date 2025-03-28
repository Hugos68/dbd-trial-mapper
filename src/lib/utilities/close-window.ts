import { WebviewWindow } from "@tauri-apps/api/webviewWindow";

export async function closeWindow() {
	const window = WebviewWindow.getCurrent();
	await window.close();
}
