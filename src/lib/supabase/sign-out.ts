import { invalidateAll } from "$app/navigation";
import { supabase } from "./client";

export async function signOut() {
	await supabase.auth.signOut();
	await invalidateAll();
}
