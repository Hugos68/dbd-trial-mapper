<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import Toaster from '$lib/components/toaster.svelte';
	import { useRealtime } from '$lib/modules/hooks/use-realtime.svelte';
	import { toaster } from '$lib/modules/ui/toaster';
	import '../app.css';

	const { data, children } = $props();

	$effect(() => {
		if (!data.lobby) {
			return;
		}
		useRealtime(
			'lobby',
			async (event) => {
				if (event.eventType === 'UPDATE' && data.lobby) {
					await invalidateAll();
				}
				if (event.eventType === 'DELETE') {
					toaster.info({
						title: 'Lobby closed',
					});
					await invalidateAll();
				}
			},
			{
				filter: `id=eq.${data.lobby.id}`,
			},
		);
	});
</script>

<Toaster />

{@render children()}
