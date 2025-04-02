import type { PhysicalSize } from '@tauri-apps/api/dpi';
import type { Position } from './positions';
import {
	getCurrentWindow,
	PhysicalPosition,
	primaryMonitor,
} from '@tauri-apps/api/window';

export async function positionallyResizeWindow(
	position: Position,
	size: PhysicalSize,
) {
	console.log('Positiong Requested');
	console.log({
		position,
		size,
	});
	const window = getCurrentWindow();
	const monitor = await primaryMonitor();
	if (!monitor) {
		return;
	}
	switch (position) {
		case 'top-left': {
			await window.setPosition(
				new PhysicalPosition(monitor.position.x, monitor.position.y),
			);
			await window.setSize(size);
			break;
		}
		case 'top-right': {
			await window.setPosition(
				new PhysicalPosition(
					monitor.position.x + monitor.size.width - size.width,
					monitor.position.y,
				),
			);
			break;
		}
		case 'bottom-left': {
			await window.setPosition(
				new PhysicalPosition(
					monitor.position.x,
					monitor.position.y + monitor.size.height - size.height,
				),
			);
			break;
		}
		case 'bottom-right': {
			await window.setPosition(
				new PhysicalPosition(
					monitor.position.x + monitor.size.width - size.width,
					monitor.position.y + monitor.size.height - size.height,
				),
			);
			break;
		}
	}
	await window.setSize(size);
}
