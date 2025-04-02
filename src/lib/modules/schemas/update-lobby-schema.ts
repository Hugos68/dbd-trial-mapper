import * as v from 'valibot';

export const UpdateLobbySchema = v.object({
	id: v.pipe(v.string(), v.uuid(), v.nonEmpty()),
	trial_id: v.pipe(v.string(), v.uuid(), v.nonEmpty()),
	user_id: v.pipe(v.string(), v.uuid(), v.nonEmpty()),
});
