import fastify from 'fastify'
import { transactionsRoutes } from './routes/transactions.ts'
import cookie from '@fastify/cookie'

const app = fastify()

app.register(cookie)

app.register(transactionsRoutes, { prefix: '/transactions' })

export { app }
