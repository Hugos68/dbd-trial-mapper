<script lang="ts">
	import Button from '$lib/components/button.svelte';
	import { supabase } from '$lib/modules/supabase/client.js';
	import { toaster } from '$lib/modules/ui/toaster.js';
	import Layout from '$lib/components/layout.svelte';
	import { useForm } from '$lib/modules/hooks/use-form.js';
	import { LoaderCircleIcon } from '@lucide/svelte';

	const { data } = $props();

	const { submitting, enhance } = useForm(data.form, {
		async onUpdate(event) {
			if (!event.form.valid) {
				return;
			}
			const createLobbyResponse = await supabase
				.from('lobby')
				.insert(event.form.data);
			if (createLobbyResponse.error) {
				event.form.valid = false;
				toaster.error({
					title: 'Failed to create lobby',
					description: createLobbyResponse.error.details,
				});
				return;
			}
			toaster.success({
				title: 'Successfully created lobby',
			});
		},
	});
</script>

<Layout title="Create Lobby">
	<form
		class="flex h-full flex-col"
		method="post"
		autocomplete="off"
		use:enhance
	>
		<Button class="mt-auto ml-auto">
			{#if $submitting}
				<LoaderCircleIcon class="animate-spin" />
			{:else}
				Create Lobby
			{/if}
		</Button>
	</form>
</Layout>
