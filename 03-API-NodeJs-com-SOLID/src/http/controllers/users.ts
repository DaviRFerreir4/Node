import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { registerUseCase } from '../../use-cases/users.ts'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string(),
  })

  const { name, email, password } = bodySchema.parse(request.body)

  try {
    registerUseCase({ name, email, password })
  } catch (error: any) {
    return reply.status(409).send()
  }

  return reply.status(201).send()
}
