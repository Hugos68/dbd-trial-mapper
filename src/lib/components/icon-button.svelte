<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface Props extends HTMLButtonAttributes {
		children?: Snippet;
	}

	const { children, class: className, ...props }: Props = $props();
</script>

<button
	class="rounded p-1 font-semibold transition-colors not-disabled:hover:bg-neutral-500/50 disabled:cursor-not-allowed {className}"
	{...props}
>
	{@render children?.()}
</button>
