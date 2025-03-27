<script lang="ts">
	import { Tooltip } from "bits-ui";
	import type {  Snippet } from "svelte";
 
	interface Props extends Tooltip.RootProps {
		trigger: Required<Tooltip.TriggerProps>['child'];
        content: Snippet;
	};
 
	const {
        trigger,
        content,
        ...props
    }: Props = $props();
</script>
 
<Tooltip.Root>
	<Tooltip.Trigger {...props}>
        {#snippet child(arg)}
            {@render trigger(arg)}
        {/snippet}
	</Tooltip.Trigger>
	<Tooltip.Portal>
		<Tooltip.Content class="p-2 preset-filled rounded-md">
			<Tooltip.Arrow />
			{@render content?.()}
		</Tooltip.Content>
	</Tooltip.Portal>
</Tooltip.Root>