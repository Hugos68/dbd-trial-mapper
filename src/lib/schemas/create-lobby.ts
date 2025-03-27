import * as v from "valibot";

export const create_lobby_schema = v.object({
	access: v.picklist(["public", "private"]),
});
