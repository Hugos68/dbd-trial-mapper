import type { RealtimePostgresChangesPayload } from '@supabase/supabase-js';
import { supabase } from '../supabase/client';
import type { Database } from '../supabase/types';

interface UseRealtimeOptions {
	filter?: string;
}

export function useRealtime<Table extends keyof Database['public']['Tables']>(
	table: Table,
	callback: (
		payload: RealtimePostgresChangesPayload<
			Database['public']['Tables'][Table]['Row']
		>,
	) => Promise<unknown> | unknown,
	options: UseRealtimeOptions = {},
) {
	$effect(() => {
		const channel = supabase.channel(`realtime-${table}`);
		channel
			.on(
				'postgres_changes',
				{
					event: '*',
					schema: 'public',
					table: table,
					filter: options.filter,
				},
				callback,
			)
			.subscribe();
		return () => channel.unsubscribe();
	});
}
