import * as v from 'valibot';

export const JoinLobbySchema = v.object({
	'lobby-id': v.pipe(v.string(), v.uuid())
});
