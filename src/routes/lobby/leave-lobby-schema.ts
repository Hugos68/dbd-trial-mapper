import * as v from 'valibot';

export const LeaveLobbySchema = v.object({
	'user-id': v.pipe(v.string(), v.uuid(), v.nonEmpty()),
	'lobby-id': v.pipe(v.string(), v.uuid(), v.nonEmpty())
});
