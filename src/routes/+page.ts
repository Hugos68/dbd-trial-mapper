import { supabase } from "../lib/supabase"

export async function load() {
    const { data, error } = await supabase.from('trial').select('*');
    
    console.log(error);
    return {
        trials: data
    }
}