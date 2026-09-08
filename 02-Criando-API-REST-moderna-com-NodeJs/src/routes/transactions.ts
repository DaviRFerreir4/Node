import type { FastifyInstance } from 'fastify'
import { knex } from '../database.ts'
import z from 'zod'

export async function transactionsRoutes(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    const bodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })

    const { title, amount, type } = bodySchema.parse(request.body)

    await knex('transactions').insert({
      title,
      amount: type === 'credit' ? amount : amount * -1,
    })

    return reply.code(201).send()
  })
}
