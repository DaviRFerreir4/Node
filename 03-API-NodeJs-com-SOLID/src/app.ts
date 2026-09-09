import fastify from 'fastify'
import { PrismaClient } from '../generated/prisma/client.ts'
import { PrismaPg } from '@prisma/adapter-pg'
import { env } from './env/index.ts'

export const app = fastify()

const prisma = new PrismaClient({ adapter: new PrismaPg(env.DATABASE_URL) })

prisma.user.create({ data: { name: 'Teste', email: 'teste@email.com' } })
