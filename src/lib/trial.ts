import { WebviewWindow } from "@tauri-apps/api/webviewWindow";
import { currentMonitor } from '@tauri-apps/api/window';

class TrialWindow {
    private static instance: TrialWindow | undefined;
    private window: WebviewWindow | undefined;

    public constructor() {
        this.window = undefined;
    }

    public static getInstance() {
        if (!this.instance) {
            this.instance = new TrialWindow();
        }
        return this.instance;
    }   

    public async show(trial: Record<string, unknown>) {
        console.log('TrialWindow.show', trial);
        const monitor = await currentMonitor();
        if (!monitor) {
            throw new Error('No monitor found');
        }
        const url = new URL(window.location.href);
        url.pathname = `/trial/${trial.id}`;
        this.window = new WebviewWindow('trial-overlay', {
            url: url.toString(),
            width: 400,
            height: 400, 
            x: monitor.size.width - 400,
            y: monitor.size.height - 400,
        })
        this.window.show();
    }

    public hide() {
        if (!this.window) {
            return;
        }
        this.window.hide();
    }
}


export { TrialWindow };