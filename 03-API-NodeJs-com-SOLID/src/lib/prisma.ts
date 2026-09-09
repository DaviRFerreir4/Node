import { env } from '@/env/index.ts'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '~/generated/prisma/client.ts'

export const prisma = new PrismaClient({
  adapter: new PrismaPg(env.DATABASE_URL),
  log: env.NODE_ENV === 'development' ? ['query'] : [],
})
