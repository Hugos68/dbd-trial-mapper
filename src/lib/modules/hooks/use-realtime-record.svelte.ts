import type { RealtimePostgresChangesPayload } from '@supabase/supabase-js';
import { supabase } from '../supabase/client';
import type { Database } from '../supabase/types';

interface UseRealmtimeRecordOptions<Table extends keyof Database['public']['Tables']> {
	table: Table;
	id: string;
}

export function useRealtimeRecord<Table extends keyof Database['public']['Tables']>(callback: (payload: RealtimePostgresChangesPayload<Record<string, unknown>>) => Promise<unknown>, options: UseRealmtimeRecordOptions<Table>) {
	$effect(() => {
		const channel = supabase.channel(`realtime-${options.table}`);
		channel
			.on(
				'postgres_changes',
				{
					event: '*',
					schema: 'public',
					table: options.table,
					filter: `id=eq.${options.id}`,
				},	
				callback
			)
			.subscribe();
		return () => channel.unsubscribe();
	});
}
