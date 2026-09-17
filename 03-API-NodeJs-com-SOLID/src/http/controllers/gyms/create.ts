import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { makeCreateGymUseCase } from '@/use-cases/factories/make-create-gym-use-case.ts'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    name: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine((val) => Math.abs(val) <= 90),
    longitude: z.number().refine((val) => Math.abs(val) <= 180),
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
