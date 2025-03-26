import { supabase } from "$lib/supabase";
import { error } from "@sveltejs/kit";

export async function load() {
	const trials = await supabase.from("trial").select("*, realm (*)");
	if (trials.error) {
		error(500, trials.error.message);
	}
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
			trials: trials.data,
			trial: trial.data,
		};
	}
	return {
		trials: trials.data,
	};
}

export const prerender = true;
export const ssr = false;
