import dotenv from 'dotenv'

dotenv.config()

export const NODE_ENV = process.env.NODE_ENV
export const PORT = process.env.PORT || 3000
export const MONGODB_URI = process.env.MONGODB_URI ?? ''
export const PAYLOAD_SECRET = process.env.PAYLOAD_SECRET ?? ''
export const CORS_ORIGINS = process.env.CORS_ORIGINS?.split(',')

export const GOOGLE_OAUTH_CLIENT_ID = process.env.GOOGLE_OAUTH_CLIENT_ID
export const GOOGLE_OAUTH_CLIENT_SECRET = process.env.GOOGLE_OAUTH_CLIENT_SECRET
