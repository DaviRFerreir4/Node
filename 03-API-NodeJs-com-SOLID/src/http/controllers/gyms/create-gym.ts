import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { makeCreateGymUseCase } from '@/use-cases/factories/make-create-gym-use-case.ts'

export async function createGym(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    name: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.coerce.number().refine((val) => Math.abs(val) <= 90),
    longitude: z.coerce.number().refine((val) => Math.abs(val) <= 180),
  })

  const { name, description, phone, latitude, longitude } = bodySchema.parse(
    request.body
  )

  const createGymUseCase = makeCreateGymUseCase()

  await createGymUseCase.execute({
    name,
    description,
    phone,
    latitude,
    longitude,
  })

  return reply.status(201).send()
}
