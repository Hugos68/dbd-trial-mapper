import * as v from 'valibot';

export const JoinLobbySchema = v.object({
	lobby_id: v.pipe(v.string(), v.uuid(), v.nonEmpty()),
});
