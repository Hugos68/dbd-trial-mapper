<script lang="ts">
	import { ElementRect } from 'runed';
	import { moveWindow } from '@tauri-apps/plugin-positioner';
	import { WebviewWindow } from '@tauri-apps/api/webviewWindow';
	import { PhysicalSize } from '@tauri-apps/api/dpi';
	import { overlaySettings } from '$lib/modules/ui/overlay-settings.js';
	import { listen } from '@tauri-apps/api/event';

	const documentRect = new ElementRect(() => document.documentElement);

	let trialUrl = $state('');

	listen<string>('trial:update', (event) => {
		trialUrl = event.payload;
	});

	// @ts-expect-error - this is fine
	$effect(async () => {
		await moveWindow(overlaySettings.current.position);
	});

	// @ts-expect-error - this is fine
	$effect(async () => {
		const window = WebviewWindow.getCurrent();
		await window.setSize(
			new PhysicalSize(
				overlaySettings.current.width,
				Math.ceil(documentRect.current.height),
			),
		);
		await moveWindow(overlaySettings.current.position);
	});
</script>

{#if trialUrl}
	<img class="size-full" src={trialUrl} alt="Trial" />
{:else}
	<p>No lobby</p>
{/if}
