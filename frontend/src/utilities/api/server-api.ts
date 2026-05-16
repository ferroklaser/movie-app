import { cookies } from "next/headers"

const EXPRESS_URL = "http://localhost:3000"

export const serverFetch = async (endpoint : string, options : RequestInit = {}) => {
    const cookieStore = await cookies()
    const cookieName = `sb-${process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID}-auth-token`
    const authCookie = cookieStore.get(cookieName)

    if (!authCookie) console.log('No auth cookie')
    
    const headers = {
        "Content-Type": "application/json",
        "Cookie" : authCookie ? `${cookieName}=${authCookie.value}` : '',
        ...options.headers
    }

    try {
        const response = await fetch(`${EXPRESS_URL}${endpoint}`, {
            ...options,
            headers
        })
        
        const data = await response.json()

        return { data, response }
    } catch (err : any) {
        console.log(err.message)
        return { data : null, response : null }
    }
}