import { supabase } from '../supabase/client';

interface UseRealtimeRecordOptions<T> {
	record: () => T;
	table: string;
	transformPayload?: (data: NonNullable<T>) => Promise<T> | T;
}

export function useRealtimeRecord<T extends { id: string } | undefined | null>(
	options: UseRealtimeRecordOptions<T>,
) {
	let record = $derived(options.record());
	$effect(() => {
		if (!record) {
			return;
		}
		const channel = supabase.channel(`${options.table}-${record.id}`);
		channel
			.on(
				'postgres_changes',
				{
					event: '*',
					schema: 'public',
					table: options.table,
					filter: `id=eq.${record.id}`,
				},
				async (payload) => {
					const updated = payload.new as NonNullable<T>;
					record = options.transformPayload
						? await options.transformPayload(updated)
						: updated;
				},
			)
			.subscribe();
		return () => channel.unsubscribe();
	});
	return {
		get current() {
			return record;
		},
	};
}
