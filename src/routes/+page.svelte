<script lang="ts">
import CopyLobbyId from "$lib/components/copy-lobby-id.svelte";
import CreateLobby from "$lib/components/create-lobby.svelte";
import JoinLobby from "$lib/components/join-lobby.svelte";
import Layout from "$lib/components/layout.svelte";
import LeaveLobby from "$lib/components/leave-lobby.svelte";
import SelectTrial from "$lib/components/select-trial.svelte";
import TrialOverlay from "$lib/components/trial-overlay.svelte";
import { useRealtimeLobby } from "$lib/hooks/use-realtime-lobby.svelte.js";

const { data } = $props();

const lobby = $derived(data.lobby ? useRealtimeLobby(data.lobby) : undefined);

let showTrial = $state(false);
</script>

{#if lobby && showTrial}
	<TrialOverlay lobby={lobby.current} onBackToLobby={() => (showTrial = false)} />
{:else}
	<Layout title="Lobby">
		<div class="grid gap-2">
			{#if lobby}
				<CopyLobbyId lobby={lobby.current} />
				<SelectTrial lobby={lobby.current} trials={data.trials} user={data.user} onShowTrial={() => (showTrial = true)} />
				<LeaveLobby lobby={lobby.current} user={data.user} />
			{:else}
				<JoinLobby />
				<CreateLobby  />
			{/if}
		</div>	  
	</Layout>
{/if}

