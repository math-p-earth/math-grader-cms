import payload from 'payload'

import express from 'express'

import { PAYLOAD_SECRET, PORT } from './config'

const app = express()

// Redirect root to Admin panel
app.get('/', (_, res) => {
  res.redirect('/admin')
})

async function start() {
  // Initialize Payload
  await payload.init({
    secret: PAYLOAD_SECRET,
    express: app,
    onInit: () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
    },
  })

  app.listen(PORT, () => {
    payload.logger.info(`Server started on port ${PORT}`)
  })
}

start()
