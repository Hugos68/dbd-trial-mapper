import { supabase } from "$lib/supabase/client";
import type { Database } from "$lib/supabase/types";

export function useRealtimeLobby(
	lobby: Database["public"]["Tables"]["lobby"]["Row"],
) {
	const value = $state({ current: lobby });
	$effect(() => {
		const channel = supabase.channel("lobby-changes");
		channel
			.on(
				"postgres_changes",
				{
					event: "UPDATE",
					schema: "public",
					table: "lobby",
					filter: `id=eq.${lobby.id}`,
				},
				async (payload) => {
					console.log("lobby-changes", payload);
					const lobby_response = await supabase
						.from("lobby")
						.select("*, trial (*)")
						.eq("id", lobby.id)
						.single();
					if (lobby_response.error) {
						throw new Error(lobby_response.error.message);
					}
					value.current = lobby_response.data;
				},
			)
			.subscribe();
		return () => channel.unsubscribe();
	});
	return value;
}
