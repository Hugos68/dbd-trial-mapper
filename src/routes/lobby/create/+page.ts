import { supabase } from "$lib/supabase";
import { error } from "@sveltejs/kit";

export async function load() {
	const lobbyId = localStorage.getItem("lobby-id");
	if (lobbyId) {
		const lobby = await supabase
			.from("lobby")
			.select("*")
			.eq("id", lobbyId)
			.single();
		if (lobby.error) {
			error(500, lobby.error.message);
		}
		return {
			lobby: lobby.data,
		};
	}
	const lobby = await supabase.from("lobby").insert({}).select().single();
	if (lobby.error) {
		error(500, lobby.error.message);
	}
	localStorage.setItem("lobby-id", lobby.data.id);
	return {
		lobby: lobby.data,
	};
}
