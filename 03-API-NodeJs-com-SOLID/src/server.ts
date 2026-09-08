import { app } from './app.ts'
import { env } from './env/index.ts'

app.listen({ port: env.PORT, host: env.HOST }).then(() => {
  console.log(`HTTP server running on port ${env.PORT} and host ${env.HOST}`)
})
