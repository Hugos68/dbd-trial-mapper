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
		'rounded bg-neutral-300 px-4 py-2 font-semibold transition-colors not-disabled:hover:bg-neutral-500 disabled:cursor-not-allowed disabled:bg-neutral-300/50 dark:bg-neutral-700 disabled:dark:bg-neutral-700/50',
		String(className),
	)}
	{...props}
>
	{@render children?.()}
</button>
