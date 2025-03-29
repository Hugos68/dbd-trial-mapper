import { WebviewWindow } from "@tauri-apps/api/webviewWindow";
import { PhysicalSize } from "@tauri-apps/api/window";
import { ElementRect } from "runed";

export function useDynamicHeight() {
	const window = WebviewWindow.getCurrent();
	const documentRect = new ElementRect(() => document.documentElement);
	const height = $derived(documentRect.current.height);
	const size = $derived(new PhysicalSize(300, Math.ceil(height)));
	$effect(() => {
		window.setSize(size);
	});
}
