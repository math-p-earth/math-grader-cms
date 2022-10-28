import * as dotenv from 'dotenv'

dotenv.config()

export const PORT = process.env.PORT || 3000
export const MONGODB_URI = process.env.MONGODB_URI
export const PAYLOAD_SECRET = process.env.PAYLOAD_SECRET
