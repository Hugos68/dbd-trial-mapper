<script lang="ts">
	import { moveWindow } from '@tauri-apps/plugin-positioner';
	import { PhysicalSize } from '@tauri-apps/api/dpi';
	import { overlaySettings } from '$lib/modules/ui/overlay-settings.js';
	import { ElementSize } from 'runed';
	import { invalidateAll } from '$app/navigation';
	import { useRealtime } from '$lib/modules/hooks/use-realtime.svelte.js';
	import { WebviewWindow } from '@tauri-apps/api/webviewWindow';

	const { data } = $props();

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
		await WebviewWindow.getCurrent().setSize(
			new PhysicalSize(
				Math.ceil(overlaySettings.current.size),
				Math.ceil(documentRect.current.height),
			),
		);
		await moveWindow(overlaySettings.current.position);
	});
</script>

<img
	class="size-full"
	inert
	style:opacity="{overlaySettings.current.opacity}%"
	src={data.lobby?.trial.image_url}
	alt="Trial"
/>

<style>
	:global(html) {
		pointer-events: none;
		background: transparent;
	}
</style>
