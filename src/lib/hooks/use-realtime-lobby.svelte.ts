import { supabase } from "$lib/supabase/client";
import type { Tables } from "$lib/supabase/types";

export function useRealtimeLobby<T extends Tables<"lobby">>(lobby: T) {
	const channel = supabase.channel(`lobby:${lobby?.id}`);
	const value = $state({
		channel: channel,
		current: lobby,
	});
	$effect(() => {
		channel
			.on(
				"broadcast",
				{
					event: "trial-update",
				},
				(payload) => {
					value.current = payload as unknown as T;
				},
			)
			.subscribe();
		return () => channel.unsubscribe();
	});
	return value;
}
