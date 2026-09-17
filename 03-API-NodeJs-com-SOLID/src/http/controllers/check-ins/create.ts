import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { makeCheckInUseCase } from '@/use-cases/factories/make-check-in-use-case.ts'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    latitude: z.number().refine((val) => Math.abs(val) <= 90),
    longitude: z.number().refine((val) => Math.abs(val) <= 180),
  })

  const paramsSchema = z.object({
    gymId: z.uuid(),
  })

  const { latitude, longitude } = bodySchema.parse(request.query)
  const { gymId } = paramsSchema.parse(request.params)
  const userId = request.user.sub

  const checkInUseCase = makeCheckInUseCase()

  await checkInUseCase.execute({
    gymId,
    userId,
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(201).send()
}
