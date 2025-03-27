import { type Position, moveWindow } from "@tauri-apps/plugin-positioner";

export async function useWindowPosition(position: Position) {
	await moveWindow(position);
}
