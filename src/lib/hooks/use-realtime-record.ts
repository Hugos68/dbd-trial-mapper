import { supabase } from "$lib/supabase/client";

interface UseRealtimeRecordOptions<T> {
	record: T;
	table: string;
	transformPayload?: (data: NonNullable<T>) => Promise<T> | T;
}

export function useRealtimeRecord<T extends { id: string } | undefined | null>(
	options: UseRealtimeRecordOptions<T>,
) {
	const value = $state({ current: options.record });
	$effect(() => {
		if (!value.current) {
			return;
		}
		const channel = supabase.channel(`${options.table}-${value.current.id}`);
		channel
			.on(
				"postgres_changes",
				{
					event: "UPDATE",
					schema: "public",
					table: options.table,
					filter: `id=eq.${value.current.id}`,
				},
				async (payload) => {
					const updated = payload.new as NonNullable<T>;
					value.current = options.transformPayload
						? await options.transformPayload(updated)
						: updated;
				},
			)
			.subscribe();
		return () => channel.unsubscribe();
	});
	return value;
}
