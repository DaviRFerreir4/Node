import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { RegisterUseCase } from '../../use-cases/users.ts'
import { PrismaUsersRepository } from '@/repositories/prisma-users-repository.ts'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string(),
  })

  const { name, email, password } = bodySchema.parse(request.body)

  try {
    const usersRepository = new PrismaUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    await registerUseCase.execute({ name, email, password })
  } catch (error: any) {
    return reply.status(409).send()
  }

  return reply.status(201).send()
}
