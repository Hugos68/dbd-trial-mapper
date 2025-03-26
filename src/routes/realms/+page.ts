import { supabase } from "$lib/supabase";
import { error } from "@sveltejs/kit";

export async function load() {
    const realms = await supabase.from('realm').select('*');
    if (realms.error) {
       error(500, realms.error.message);
    }
    return {
        realms: realms.data
    }
}