import { WebviewWindow } from "@tauri-apps/api/webviewWindow";
import { PhysicalSize } from "@tauri-apps/api/window";
import { useDocumentHeight } from "./use-document-height.svelte.js";

function useDynamicWindowSize() {
	const height = useDocumentHeight();
	$effect(() => {
		const window = WebviewWindow.getCurrent();
		window.setSize(new PhysicalSize(300, Math.round(height.current)));
	});
}

export { useDynamicWindowSize };
