import { WebviewWindow } from '@tauri-apps/api/webviewWindow';
import { useDocumentHeight } from './use-document-height.svelte.js';
import { PhysicalSize } from '@tauri-apps/api/window';

function useDynamicWindowSize() {
    const height = useDocumentHeight();
    $effect(() => { 
        const window = WebviewWindow.getCurrent();
        window.setSize(new PhysicalSize(500, Math.round(height.current)));
    });
}

export { useDynamicWindowSize }; 