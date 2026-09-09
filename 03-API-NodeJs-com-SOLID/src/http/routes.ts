import type { FastifyInstance } from 'fastify'
import { register } from './controllers/users.ts'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
}
