<script lang="ts">
	import { moveWindow } from '@tauri-apps/plugin-positioner';
	import { WebviewWindow } from '@tauri-apps/api/webviewWindow';
	import { PhysicalSize } from '@tauri-apps/api/dpi';
	import { overlaySettings } from '$lib/modules/ui/overlay-settings.js';
	import { ElementSize } from 'runed';
	import { invalidateAll } from '$app/navigation';
	import { useRealtime } from '$lib/modules/hooks/use-realtime.svelte.js';

	const { data } = $props();

	const window = WebviewWindow.getCurrent();
	const documentRect = new ElementSize(() => document.documentElement);

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

	$effect(() => {
		if (overlaySettings.current.visible) {
			window.show();
		} else {
			window.hide();
		}
	});

	// @ts-expect-error - this is fine
	$effect(async () => {
		await window.setSize(
			new PhysicalSize(
				Math.ceil(overlaySettings.current.size),
				Math.ceil(documentRect.current.height),
			),
		);
		await moveWindow(overlaySettings.current.position);
	});
</script>

<div class="size-full">
	<img
		class="size-full"
		inert
		style:opacity="{overlaySettings.current.opacity}%"
		src={data.lobby?.trial.image_url}
		alt="Trial"
	/>
</div>

<style>
	:global(html) {
		pointer-events: none;
		background: transparent;
	}
</style>
