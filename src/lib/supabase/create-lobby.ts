import { invalidateAll } from "$app/navigation";
import { supabase } from "./client";

export async function createLobby() {
	const insertLobbyResponse = await supabase.from("lobby").insert({});
	if (insertLobbyResponse.error) {
		throw new Error(insertLobbyResponse.error.message);
	}
	await invalidateAll();
}
