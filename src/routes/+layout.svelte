<script lang="ts">
	import Toaster from '$lib/components/toaster.svelte';
	import '../app.css';

	const { children } = $props();
</script>

<Toaster />

{@render children()}
