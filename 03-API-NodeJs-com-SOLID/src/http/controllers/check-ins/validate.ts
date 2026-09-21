import { makeValidateCheckInUseCase } from '@/use-cases/factories/make-validate-check-in-use-case.ts'
import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    checkInId: z.uuid(),
  })

  const { checkInId } = paramsSchema.parse(request.params)

  const validateCheckInUseCase = makeValidateCheckInUseCase()

  await validateCheckInUseCase.execute({
    checkInId,
  })

  return reply.status(204).send()
}
