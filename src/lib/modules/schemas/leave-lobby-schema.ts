import * as v from 'valibot';

export const LeaveLobbySchema = v.object({
	user_id: v.pipe(v.string(), v.uuid(), v.nonEmpty()),
	lobby_id: v.pipe(v.string(), v.uuid(), v.nonEmpty()),
});
