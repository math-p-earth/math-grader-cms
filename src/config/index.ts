import dotenv from 'dotenv'

dotenv.config()
// read from this path on production
dotenv.config({ path: './env/.env' })

// TODO: use t3-env to configure environment variables
export const NODE_ENV = process.env.NODE_ENV
export const PORT = process.env.PORT || 3000
export const MONGODB_URI = process.env.MONGODB_URI ?? ''
export const PAYLOAD_SECRET = process.env.PAYLOAD_SECRET ?? ''
export const CORS_ORIGINS = process.env.CORS_ORIGINS?.split(',')

export const GOOGLE_OAUTH_CLIENT_ID = process.env.GOOGLE_OAUTH_CLIENT_ID
export const GOOGLE_OAUTH_CLIENT_SECRET = process.env.GOOGLE_OAUTH_CLIENT_SECRET

export const S3_ACCESS_KEY_ID = process.env.S3_ACCESS_KEY_ID ?? ''
export const S3_SECRET_ACCESS_KEY = process.env.S3_SECRET_ACCESS_KEY ?? ''
export const S3_REGION = process.env.S3_REGION ?? ''
export const S3_BUCKET = process.env.S3_BUCKET ?? ''
export const S3_PREFIX = process.env.PAYLOAD_PUBLIC_S3_PREFIX ?? ''

export const MATH_WORKER_URL = process.env.MATH_WORKER_URL ?? 'http://localhost:4000'
