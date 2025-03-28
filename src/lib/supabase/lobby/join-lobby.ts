import { invalidateAll } from "$app/navigation";
import { supabase } from "../client";

export async function joinLobby(id: string) {
	const insertLobbyResponse = await supabase.from("lobby_participant").insert({
		lobby_id: id,
	});
	if (insertLobbyResponse.error) {
		throw new Error(insertLobbyResponse.error.message);
	}
	await invalidateAll();
}
