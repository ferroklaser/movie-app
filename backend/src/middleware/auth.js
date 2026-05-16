import { supabase } from "../supabase.js"

export const requireAuth = async (req, res, next) => {
    // obtain cookie containing jwt
    const authCookie = req.cookies[`sb-${process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID}-auth-token`]

    if (!authCookie) {
        return res.status(401).json({
            error: 'Unauthorized: No session cookie found'
        })
    }

    try {
        // retrieve jwt from the cookie
        // 1. Strip out the "base64-" prefix before decoding
        const base64Data = authCookie.replace('base64-', '');

        // 2. Cleanly decode and immediately parse it into your object
        const decodedText = Buffer.from(base64Data, 'base64').toString('utf8');
        const sessionData = JSON.parse(decodedText);
        
        const jwt = sessionData?.access_token

        if (!jwt) {
            return res.status(401).json({
                error: 'Unauthorized: Missing access token'
            })
        }

        // validata user jwt on supabase server
        const { data: { user }, error } = await supabase.auth.getUser(jwt)

        if (error || !user) {
            return res.status(401).json({ error: 'Unauthorized: Invalid token' })
        }

        req.user = user

        next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({ error: 'Unauthorized: Failed to parse authentication' });
    }
}