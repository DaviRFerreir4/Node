import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { makeFetchMemberCheckInsHistoryUseCase } from '@/use-cases/factories/make-fetch-member-check-ins-history-use-case.ts'

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const querySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = querySchema.parse(request.query)
  const userId = request.user.sub

  const fetchMemberCheckInsHistoryUseCase =
    makeFetchMemberCheckInsHistoryUseCase()

  const { checkIns } = await fetchMemberCheckInsHistoryUseCase.execute({
    userId,
    page,
  })

  return reply.status(200).send({ checkIns })
}
