<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import Toaster from '$lib/components/toaster.svelte';
	import { useRealtime } from '$lib/modules/hooks/use-realtime.svelte';
	import { toaster } from '$lib/modules/ui/toaster';
	import '../app.css';

	const { data, children } = $props();
</script>

<Toaster />

{@render children()}
