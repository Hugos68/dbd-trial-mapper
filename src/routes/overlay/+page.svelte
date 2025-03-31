<script lang="ts">
	import { ElementRect } from 'runed';
	import { moveWindow } from '@tauri-apps/plugin-positioner';
	import { WebviewWindow } from '@tauri-apps/api/webviewWindow';
	import { PhysicalSize } from '@tauri-apps/api/dpi';
	import { overlaySettings } from '$lib/modules/ui/overlay-settings.js';
	import { listen } from '@tauri-apps/api/event';

	const { data } = $props();

	let lobby = $derived(data.lobby);

	const documentRect = new ElementRect(() => document.documentElement);

	listen<typeof data.lobby>('lobby:update', (event) => (lobby = event.payload));

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

<div class="contents" inert>
	{#if lobby}
		<img class="size-full" src={lobby.trial.image_url} alt="Trial" />
	{:else}
		<p>No lobby</p>
	{/if}
</div>
