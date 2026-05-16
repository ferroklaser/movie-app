const API_PREFIX = '/api/express'

export const clientFetch = async (endpoint : string, options : RequestInit = {}) => {
    try {
        const headers = {
            "Content-Type": "application/json",
            ...options.headers
        }

        const response = await fetch(`http://localhost:3001${API_PREFIX}${endpoint}`, {
            ...options,
            headers,
            credentials : 'include'
        })

        const data = await response.json()

        if (!response.ok) {
            const errorReason = data?.error || `HTTP error! Status: ${response.status}`;
            throw new Error(errorReason);
        }

        return { data, response }
    } catch (err : any) {
        console.log(err.message)
        throw(err)
    }
}