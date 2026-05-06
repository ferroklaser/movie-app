'use client'

import { createContext, useContext, useEffect, useState } from "react"

const RealTimeContext = createContext<{ lastActivity: string | null }>({
    lastActivity: null
})

export const RealTimeProvider = ({ children } : { children : React.ReactNode }) => {

    const [lastActivity, setLastActivity] = useState<string | null>(null)

    useEffect(() => {
        const socket = new WebSocket("ws://localhost:8080/ws");
        (window as any).socket = socket

        socket.onmessage = (event) => {
            setLastActivity(event.data)

            setTimeout(() => setLastActivity(null), 5000)

            return () => socket.close();
        }
    }, [])

    return (
        <RealTimeContext.Provider value={{ lastActivity }}>
            {children}
        </RealTimeContext.Provider>
    )
}

export const useRealTime = () => useContext(RealTimeContext)