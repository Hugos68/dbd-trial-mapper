import { supabase } from "$lib/supabase";
import { error } from "@sveltejs/kit";

export async function load() {
	const trialId = localStorage.getItem("trial-id");
	if (trialId) {
		const trial = await supabase
			.from("trial")
			.select("*")
			.eq("id", trialId)
			.single();
		if (trial.error) {
			error(500, trial.error.message);
		}
		return {
			trial: trial.data,
		};
	}
}

export const prerender = true;
export const ssr = false;
