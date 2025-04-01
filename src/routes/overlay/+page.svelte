<script lang="ts">
	import { moveWindow } from '@tauri-apps/plugin-positioner';
	import { WebviewWindow } from '@tauri-apps/api/webviewWindow';
	import { PhysicalSize } from '@tauri-apps/api/dpi';
	import { overlaySettings } from '$lib/modules/ui/overlay-settings.js';
	import { ElementSize } from 'runed';
	import { listen } from '@tauri-apps/api/event';
	import type { Tables } from '$lib/modules/supabase/types';

	const window = WebviewWindow.getCurrent();

	let lobby: Tables<'lobby'> & { trial: Tables<'trial'> & { realm: Tables<'realm'> } } | undefined = $state();

	$inspect(lobby);

	$effect(() => {
		listen<typeof lobby>('lobby', async (event) => {
			if (event.payload) {
				lobby = event.payload;
				await window.show();
			} else {
				await window.hide();
				lobby = undefined;
			}
			
		});	
	});

	const documentRect = new ElementSize(() => document.documentElement);

	$effect(() => {
		if (overlaySettings.current.visible && lobby) {
			window.show();
		} else {
			window.hide();
		}
	});

	$effect(() => {
		window.setSize(
			new PhysicalSize(
				Math.ceil(overlaySettings.current.size),
				Math.ceil(documentRect.current.height),
			),
		).then(() => {
			moveWindow(overlaySettings.current.position)
		})
	});
</script>

<div inert>
	{#if lobby}
		<img
			class="size-full"
			style:opacity="{overlaySettings.current.opacity}%"
			src={lobby.trial.image_url}
			alt="Trial"
		/>
	{:else}
		<div class="size-72 bg-red-500 grid place-items-center">
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
