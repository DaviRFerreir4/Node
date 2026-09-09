import { prisma } from '@/lib/prisma.ts'
import { hash } from 'bcryptjs'
import type { FastifyReply, FastifyRequest } from 'fastify'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export async function registerUseCase({
  name,
  email,
  password,
}: RegisterUseCaseRequest) {
  const userWithSameEmail = await prisma.user.findUnique({ where: { email } })

  if (userWithSameEmail) {
    throw new Error('Email already registred')
  }

  const password_hash = await hash(password, 6)

  await prisma.user.create({
    data: { name, email, password_hash },
  })
}
