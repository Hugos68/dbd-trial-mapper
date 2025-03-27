import { WebviewWindow } from "@tauri-apps/api/webviewWindow";
import { PhysicalSize } from "@tauri-apps/api/window";
import { ElementRect } from "runed";

export function useDynamicHeight() {
	const window = WebviewWindow.getCurrent();
	const documentRect = new ElementRect(() => document.documentElement);
	$effect(() => {
		window.setSize(
			new PhysicalSize(400, Math.round(documentRect.current.height)),
		);
	});
}