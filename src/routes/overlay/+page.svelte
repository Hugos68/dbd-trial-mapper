<script lang="ts">
	import { moveWindow } from '@tauri-apps/plugin-positioner';
	import { WebviewWindow } from '@tauri-apps/api/webviewWindow';
	import { PhysicalSize } from '@tauri-apps/api/dpi';
	import { overlaySettings } from '$lib/modules/ui/overlay-settings.js';
	import { ElementSize } from 'runed';
	import { Lobby } from '$lib/modules/context/lobby';

	const lobby = Lobby.get();
	const documentRect = new ElementSize(() => document.documentElement);

	// @ts-expect-error - this is fine
	$effect(async () => {
		// TODO: This doesn't seem to work
		if (!lobby.current) {
			const overlay = await WebviewWindow.getByLabel('overlay');
			if (overlay) {
				await overlay.hide();
			}
		}
	});

	// @ts-expect-error - this is fine
	$effect(async () => {
		if (overlaySettings.current.visible) {
			const overlay = await WebviewWindow.getByLabel('overlay');
			if (overlay) {
				await overlay.show();
			}
		} else {
			const overlay = await WebviewWindow.getByLabel('overlay');
			if (overlay) {
				await overlay.hide();
			}
		}
	});

	// @ts-expect-error - this is fine
	$effect(async () => {
		const window = WebviewWindow.getCurrent();
		await window.setSize(
			new PhysicalSize(
				Math.ceil(overlaySettings.current.size),
				Math.ceil(documentRect.current.height),
			),
		);
		await moveWindow(overlaySettings.current.position);
	});
</script>

<div inert>
	{#if lobby.current}
		<img
			class="size-full"
			style:opacity="{overlaySettings.current.opacity}%"
			src={lobby.current.trial.image_url}
			alt="Trial"
		/>
	{:else}
		<div>
			<p>No trial loaded</p>
		</div>
	{/if}
</div>

<style>
	:global(html) {
		pointer-events: none;
		background: transparent;
	}
</style>
