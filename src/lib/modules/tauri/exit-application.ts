import { exit } from '@tauri-apps/plugin-process';

export async function exitApplication() {
	await exit(0);
}
