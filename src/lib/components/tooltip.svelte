<script lang="ts">
import * as bits from "bits-ui";
import type { Snippet } from "svelte";

interface Props extends bits.Tooltip.RootProps {
	trigger: Required<bits.Tooltip.TriggerProps>["child"];
	content: Snippet;
}

const { trigger, content, ...props }: Props = $props();
</script>
 
<bits.Tooltip.Root>
	<bits.Tooltip.Trigger {...props}>   
        {#snippet child(arg)}
            {@render trigger(arg)}
        {/snippet}
	</bits.Tooltip.Trigger>
	<bits.Tooltip.Portal>
		<bits.Tooltip.Content class="p-1 preset-filled rounded-md text-xs font-bold" sideOffset={8}>
			{@render content?.()}
		</bits.Tooltip.Content>
	</bits.Tooltip.Portal>
</bits.Tooltip.Root>