import { supabase } from "$lib/supabase/client";
import type { Tables } from "$lib/supabase/types";

export function useRealtimeLobby<T extends Tables<"lobby">>(lobby: T) {
	const value = $state({
		current: lobby,
	});
	$effect(() => {
		const channel = supabase.channel(`lobby-${lobby.id}`)
			.on(
				"postgres_changes",
				{
					event: "UPDATE",
					schema: "public",
					table: "lobby",
					filter: `id=eq.${lobby.id}`,
				},
				(payload) => {
					value.current = payload.new as T;
				}
			)
			.subscribe();
		return channel.unsubscribe;
	});
	return value;
}
