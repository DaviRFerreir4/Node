import type { FastifyReply, FastifyRequest } from 'fastify'
import type { Role } from '~/prisma/generated/prisma/enums.ts'

export function verifyUserRole(roleToVerify: Role) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    if (request.user.role !== roleToVerify) {
      return reply.status(401).send({ message: 'Unaithorized' })
    }
  }
}
