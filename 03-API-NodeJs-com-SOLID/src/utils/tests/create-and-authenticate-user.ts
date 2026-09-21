import request from 'supertest'
import type { FastifyInstance } from 'fastify'
import { prisma } from '@/lib/prisma.ts'
import { hash } from 'bcryptjs'

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin: boolean = false
) {
  await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john.doe@email.com',
      password_hash: await hash('drowssap', 8),
      role: isAdmin ? 'ADMIN' : 'MEMBER',
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'john.doe@email.com',
    password: 'drowssap',
  })

  const { token } = authResponse.body

  return { token }
}
