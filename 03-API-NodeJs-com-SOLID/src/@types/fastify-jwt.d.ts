import '@fastify/jwt'
import type { Role } from '~/prisma/generated/prisma/enums.ts'

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: {
      sub: string
      role?: Role
    }
  }
}
