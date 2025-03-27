import { WebviewWindow } from "@tauri-apps/api/webviewWindow";

export async function useShowWindow() {
    await WebviewWindow.getCurrent().show();
}