import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { makeFetchNearbyGymsUseCase } from '@/use-cases/factories/make-fetch-nearby-gyms-use-case.ts'

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const querySchema = z.object({
    latitude: z.coerce.number().refine((val) => Math.abs(val) <= 90),
    longitude: z.coerce.number().refine((val) => Math.abs(val) <= 180),
    page: z.coerce.number().min(1).default(1),
  })

  const { latitude, longitude, page } = querySchema.parse(request.query)

  const fetchNearbyGymsUseCase = makeFetchNearbyGymsUseCase()

  const { gyms } = await fetchNearbyGymsUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
    page,
  })

  return reply.status(200).send({ gyms })
}
