<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface Props extends Omit<HTMLButtonAttributes, 'class'> {
		children?: Snippet;
	}

	const { children, ...props }: Props = $props();
</script>

<button
	class="rounded-md bg-neutral-300 px-4 py-2 font-semibold transition-colors not-disabled:hover:bg-neutral-500 disabled:cursor-not-allowed disabled:bg-neutral-300/50 dark:bg-neutral-700 disabled:dark:bg-neutral-700/50"
	{...props}
>
	{@render children?.()}
</button>
