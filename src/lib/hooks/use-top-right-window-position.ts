import { WebviewWindow } from '@tauri-apps/api/webviewWindow';
import { currentMonitor, PhysicalPosition } from '@tauri-apps/api/window';

const X_OFFSET = 9;

async function useTopRightWindowPosition() {
    const window = WebviewWindow.getCurrent();
    const monitor = await currentMonitor();
    if (!monitor) {
        throw new Error('No monitor found');
    }
    const size = await window.size();
    window.setPosition(new PhysicalPosition(monitor.size.width - size.width - X_OFFSET, 0));
}

export { useTopRightWindowPosition }; 