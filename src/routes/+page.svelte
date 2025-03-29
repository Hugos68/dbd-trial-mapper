<script lang="ts">
import CopyLobbyId from "$lib/components/copy-lobby-id.svelte";
import CreateLobby from "$lib/components/create-lobby.svelte";
import JoinLobby from "$lib/components/join-lobby.svelte";
import Layout from "$lib/components/layout.svelte";
import LeaveLobby from "$lib/components/leave-lobby.svelte";
import SelectTrial from "$lib/components/select-trial.svelte";
import { useRealtime } from "$lib/hooks/use-realtime.svelte.js";
import { supabase } from "$lib/supabase/client.js";
import { error } from "@sveltejs/kit";

const { data } = $props();

const lobby = useRealtime({
	init: data.lobby,
	table: "lobby",
	async transform(data) {
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
});

let showTrial = $state(false);
</script>

<Layout title="Lobby">
	<div class="grid gap-2">
		{#if lobby.current}
			<CopyLobbyId lobby={lobby.current} />
			<SelectTrial lobby={lobby.current} trials={data.trials} user={data.user} onShowTrial={() => (showTrial = true)} />
			<LeaveLobby lobby={lobby.current} user={data.user} />
		{:else}
			<JoinLobby />
			<CreateLobby  />
		{/if}
	</div>	  
</Layout>


