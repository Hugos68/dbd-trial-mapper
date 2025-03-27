import { supabase } from "$lib/supabase/client";
import type { Database } from "$lib/supabase/types";

export function useRealtimeLobby<T extends { id: string }>(lobby: T) {
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
					const lobby_response = await supabase
						.from("lobby")
						.select("*, trial (*)")
						.eq("id", lobby.id)
						.single();
					if (lobby_response.error) {
						throw new Error(lobby_response.error.message);
					}
					value.current = lobby_response.data as unknown as T;
				},
			)
			.subscribe();
		return () => channel.unsubscribe();
	});
	return value;
}
