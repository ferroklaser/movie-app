import { createClient } from "@/src/lib/supabase/client";

export async function signInWithEmail(email : string, password : string) {
    const supabase = createClient()

    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    })
}