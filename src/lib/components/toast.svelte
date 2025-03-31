<script lang="ts">
	import * as toast from '@zag-js/toast';
	import { normalizeProps, useMachine } from '@zag-js/svelte';

	interface Props {
		toast: toast.Options;
		index: number;
		service: toast.GroupService;
	}

	const props: Props = $props();
	const service = useMachine(toast.machine, () => ({
		...props.toast,
		parent: props.service,
		index: props.index
	}));
	const api = $derived(toast.connect(service, normalizeProps));
	const typeClasses = $derived.by(() => {
		switch (api.type) {
			case 'success':
				return 'border border-green-500/50';
			case 'warning':
				return 'border border-yellow-500/50';
			case 'error':
				return 'border border-red-500/50';
			default:
				return 'border border-default-500/50';
		}
	});
</script>

<div
	class="grid gap-1 rounded bg-neutral-100 p-4 dark:bg-neutral-900 {typeClasses} w-full max-w-xs"
	{...api.getRootProps()}
>
	<span class="text-lg font-semibold" {...api.getTitleProps()}>{api.title}</span>
	<span class="text-sm" {...api.getDescriptionProps()}>{api.description}</span>
</div>

<style>
	[data-part='root'] {
		translate: var(--x) var(--y);
		scale: var(--scale);
		z-index: var(--z-index);
		height: var(--height);
		opacity: var(--opacity);
		will-change: translate, opacity, scale;
	}
	[data-part='root'] {
		transition:
			translate 400ms,
			scale 400ms,
			opacity 400ms;
		transition-timing-function: cubic-bezier(0.21, 1.02, 0.73, 1);
	}
	[data-part='root'][data-state='closed'] {
		transition:
			translate 400ms,
			scale 400ms,
			opacity 200ms;
		transition-timing-function: cubic-bezier(0.06, 0.71, 0.55, 1);
	}
</style>
