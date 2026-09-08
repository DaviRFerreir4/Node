import fastify from 'fastify'
import { knex } from './database.ts'
import { env } from './env/index.ts'
import { transactionsRoutes } from './routes/transactions.ts'

const app = fastify()

app.register(transactionsRoutes, { prefix: '/transactions' })

app.listen({ port: env.PORT }).then(() => {
  console.log(`Server is running on port ${env.PORT}`)
})
