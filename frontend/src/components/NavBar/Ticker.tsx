'use client'

import { useRealTime } from "@/src/context/RealTimeContext"

const Ticker = () => {
    const { lastActivity } = useRealTime()

    if (!lastActivity) {
        return null
    }

    return (
    <div className="p-5 h-full ">
        {lastActivity}
    </div>
)}

export default Ticker