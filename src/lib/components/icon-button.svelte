<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { twMerge } from 'tailwind-merge';

	interface Props extends HTMLButtonAttributes {
		children?: Snippet;
	}

	const { children, class: className, ...props }: Props = $props();
</script>

<button
	class={twMerge(
		'rounded p-1 font-semibold transition-colors not-disabled:hover:bg-neutral-500/50 disabled:cursor-not-allowed',
		String(className),
	)}
	{...props}
>
	{@render children?.()}
</button>
