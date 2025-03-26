import { supabase } from "$lib/supabase";
import { error } from "@sveltejs/kit";

export async function load() {
    const { 
        data: trials, 
        error: trialsError 
    } = await supabase.from('trial').select(`
        *,
        realm ( * )
    `);
    
    if (trialsError) {
       error(500, trialsError.message);
    }

    return {
        trials: trials
    }
}

export const prerender = true;
export const ssr = false;