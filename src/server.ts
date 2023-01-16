import payload from 'payload'

import express from 'express'

import { MONGODB_URI, PAYLOAD_SECRET, PORT } from './config'

const app = express()

// Redirect root to Admin panel
app.get('/', (_, res) => {
  res.redirect('/admin')
})

// Initialize Payload
payload.init({
  secret: PAYLOAD_SECRET,
  mongoURL: MONGODB_URI,
  express: app,
  onInit: () => {
    payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
  },
})

// Add your own express routes here

app.listen(PORT, () => {
  payload.logger.info(`Server started on port ${PORT}`)
})
