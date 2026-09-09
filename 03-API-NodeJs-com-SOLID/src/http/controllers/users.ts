import { prisma } from '@/lib/prisma.ts'
import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string(),
  })

  const { name, email, password } = bodySchema.parse(request.body)

  const result = await prisma.user.create({
    data: { name, email, password_hash: password },
  })

  return reply.status(201).send()
}
