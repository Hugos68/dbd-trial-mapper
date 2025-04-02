<script lang="ts">
	import { PhysicalSize } from '@tauri-apps/api/window';
	import { overlaySettings } from '$lib/modules/ui/overlay-settings.js';
	import { ElementRect } from 'runed';
	import { invalidateAll } from '$app/navigation';
	import { useRealtime } from '$lib/modules/hooks/use-realtime.svelte.js';
	import { WebviewWindow } from '@tauri-apps/api/webviewWindow';
	import { positionallyResizeWindow } from '$lib/modules/tauri/resize-position-window.js';

	const { data } = $props();

	const documentRect = new ElementRect(() => document.documentElement);

	useRealtime('lobby', async (event) => {
		if (event.eventType === 'UPDATE' && data.lobby?.id === event.old.id) {
			await invalidateAll();
		}
		if (event.eventType === 'DELETE' && data.lobby?.id === event.old.id) {
			await invalidateAll();
		}
	});

	useRealtime(
		'lobby_member',
		async (event) => {
			if (event.eventType === 'INSERT') {
				await invalidateAll();
			}
		},
		{
			filter: `user_id=eq.${data.user.id}`,
		},
	);

	// @ts-expect-error - this is fine
	$effect(async () => {
		if (overlaySettings.current.visible) {
			await WebviewWindow.getCurrent().show();
		} else {
			await WebviewWindow.getCurrent().hide();
		}
	});

	// @ts-expect-error - this is fine
	$effect(async () => {
		if (documentRect.current.height === 0 || documentRect.current.width === 0) {
			return;
		}
		await positionallyResizeWindow(
			overlaySettings.current.position,
			new PhysicalSize(
				Math.ceil(documentRect.current.width),
				Math.ceil(documentRect.current.height),
			),
		);
	});
</script>

<div
	class="size-fit"
	style:width="{overlaySettings.current.size}px"
	style:opacity="{overlaySettings.current.opacity}%"
>
	<img src={data.lobby?.trial.image_url} alt="Trial" />
</div>

<style>
	:global(html) {
		width: fit-content;
		height: fit-content;
		pointer-events: none;
		background: transparent;
	}
</style>
