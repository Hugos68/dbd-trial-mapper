<script lang="ts">
import CopyLobbyId from "$lib/components/copy-lobby-id.svelte";
import CreateLobby from "$lib/components/create-lobby.svelte";
import JoinLobby from "$lib/components/join-lobby.svelte";
import Layout from "$lib/components/layout.svelte";
import LeaveLobby from "$lib/components/leave-lobby.svelte";
import SelectTrial from "$lib/components/select-trial.svelte";
import TrialOverlay from "$lib/components/trial-overlay.svelte";
import { useRealtimeRecord } from "$lib/hooks/use-realtime-record.svelte";
import { supabase } from "$lib/supabase/client";
import { error } from "@sveltejs/kit";

const { data } = $props();

const lobby = $derived(
	useRealtimeRecord({
		record: data.lobby,
		table: "lobby",
		async transformPayload(data) {
			const lobby = await supabase
				.from("lobby")
				.select("*, trial (*)")
				.eq("id", data.id)
				.single();
			if (lobby.error) {
				error(500, lobby.error.message);
			}
			return lobby.data;
		},
	}),
);

let showTrialOverlay = $state(false);
</script>

{#if lobby.current && showTrialOverlay}
	<TrialOverlay lobby={lobby.current} onClose={() => (showTrialOverlay = false)} />
{:else if !showTrialOverlay}
	<Layout>
		<div class="grid gap-2">
			{#if lobby.current}
				<CopyLobbyId lobby={lobby.current} />
				<SelectTrial lobby={lobby.current} trials={data.trials} user={data.user} onOpen={() => (showTrialOverlay = true)} />
				<LeaveLobby lobby={lobby.current} user={data.user} />
			{:else}
				<JoinLobby />
				<CreateLobby  />
			{/if}
		</div>	  
	</Layout>
{/if}

