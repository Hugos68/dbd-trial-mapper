import { supabase } from "$lib/supabase/client";
import type { Tables } from "$lib/supabase/types";

export function useRealtimeLobby(
	lobby: Tables<"lobby"> & { trial: Tables<"trial"> | null },
) {
	const value = $state({
		current: lobby,
	});
	$effect(() => {
		const channel = supabase
			.channel(`lobby-${lobby.id}`)
			.on(
				"postgres_changes",
				{
					event: "UPDATE",
					schema: "public",
					table: "lobby",
					filter: `id=eq.${lobby.id}`,
				},
				async () => {
					const lobbyResponse = await supabase
						.from("lobby")
						.select("*, trial (*)")
						.eq("id", lobby.id)
						.single();
					if (lobbyResponse.error) {
						throw new Error(lobbyResponse.error.message);
					}
					value.current = lobbyResponse.data;
				},
			)
			.subscribe();
		return () => channel.unsubscribe();
	});
	return value;
}
