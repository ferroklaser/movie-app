import { createClient } from "@/src/lib/supabase/client";

export async function signUpNewUser(email : string, password : string) {
    const supabase = createClient()

    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password
    })

    return { data, error }
}
