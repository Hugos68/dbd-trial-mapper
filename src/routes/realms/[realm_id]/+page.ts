import { supabase } from "$lib/supabase";
import { error } from "@sveltejs/kit";

export async function load(event) {
    const realm = await supabase.from('realm').select('*').eq('id', event.params.realm_id).single();
    if (realm.error) {
       error(500, realm.error.message);
    }
    const trials = await supabase.from('trial').select('*').eq('realm', event.params.realm_id);
    if (trials.error) {
         error(500, trials.error.message);
    }
    return {
        realm: realm.data,
        trials: trials.data
    }
}