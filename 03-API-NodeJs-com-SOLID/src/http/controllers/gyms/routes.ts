import type { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/middlewares/verifyJWT.ts'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
}
