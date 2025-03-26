import { WebviewWindow } from '@tauri-apps/api/webviewWindow';
import { useDocumentHeight } from './use-document-height.svelte.js';
import { PhysicalSize } from '@tauri-apps/api/window';

function useDynamicWindowSize() {
    const window = WebviewWindow.getCurrent();
    const height = useDocumentHeight();
    $effect(() => {
        window.setSize(new PhysicalSize(500, height.current));
    });
}

export { useDynamicWindowSize }; 