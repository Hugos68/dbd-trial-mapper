<script lang="ts">
	import { moveWindow } from '@tauri-apps/plugin-positioner';
	import { WebviewWindow } from '@tauri-apps/api/webviewWindow';
	import { PhysicalSize } from '@tauri-apps/api/dpi';
	import { overlaySettings } from '$lib/modules/ui/overlay-settings.js';
	import { ElementSize } from 'runed';
	import { CurrentLobby } from '$lib/modules/context/current-lobby';

	const lobby = CurrentLobby.get();

	const documentRect = new ElementSize(() => document.documentElement);

	$inspect(lobby.current);

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
			class="size-full opacity-50"
			src={lobby.current.trial.image_url}
			alt="Trial"
		/>
	{:else}
		<div>
			<p>No trial loaded</p>
			<p></p>
		</div>
	{/if}
</div>

<style>
	:global(html, body) {
		width: fit-content;
		height: fit-content;
	}
</style>
