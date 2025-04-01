<script lang="ts">
	import Toaster from '$lib/components/toaster.svelte';
	import { CurrentLobby } from '$lib/modules/context/current-lobby';
	import { useRealtimeRecord } from '$lib/modules/hooks/use-realtime-record.svelte';
	import { supabase } from '$lib/modules/supabase/client';
	import '../app.css';

	const { data, children } = $props();

	const lobby = useRealtimeRecord({
		record: () => data.lobby,
		table: 'lobby',
		async transformPayload(payload) {
			const lobbyResponse = await supabase
				.from('lobby')
				.select('*, trial(*, realm (*))')
				.eq('id', payload.id)
				.single();
			if (lobbyResponse.error) {
				return data.lobby;
			}
			return lobbyResponse.data;
		},
	});

	CurrentLobby.set(lobby);
</script>

<Toaster />

{@render children()}
