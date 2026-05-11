import redisClient from "../redisClient.js"

export const notifyActivity = async (movieTitle) => {
    const msg = {
        message: `Someone just added ${movieTitle}`,
        timestamp: new Date().toISOString()
    }
    await redisClient.publish('movieActivityUpdates', JSON.stringify(msg))
}