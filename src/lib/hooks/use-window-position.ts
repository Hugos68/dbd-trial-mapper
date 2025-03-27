import { moveWindow, type Position } from '@tauri-apps/plugin-positioner';

export async function useWindowPosition(position: Position) {
    await moveWindow(position);
}