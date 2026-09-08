import type { FastifyInstance } from 'fastify'
import { knex } from '../database.ts'
import z from 'zod'
import { randomUUID } from 'node:crypto'
import { checkSessionIdExists } from '../middlewares/checkSessionId.ts'

export async function transactionsRoutes(app: FastifyInstance) {
  app.addHook('preHandler', async (request) => {
    console.log(`${request.method} - ${request.url}`)
  })

  app.get('/', { preHandler: checkSessionIdExists }, async (request) => {
    const transactions = await knex('transactions').where({
      session_id: request.sessionId ?? '',
    })

    return { transactions }
  })

  app.get('/:id', { preHandler: checkSessionIdExists }, async (request) => {
    const paramsSchema = z.object({ id: z.uuid() })

    const { id } = paramsSchema.parse(request.params)

    const transaction = await knex('transactions')
      .where({ id, session_id: request.sessionId ?? '' })
      .first()

    return { transaction }
  })

  app.get('/summary', { preHandler: checkSessionIdExists }, async (request) => {
    const summary = await knex('transactions')
      .where({ session_id: request.sessionId ?? '' })
      .sum('amount', { as: 'amount' })
      .first()

    return { summary }
  })

  app.post('/', async (request, reply) => {
    const bodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })

    const { title, amount, type } = bodySchema.parse(request.body)

    let sessionId = request.cookies.sessionId

    if (!sessionId) {
      sessionId = randomUUID()

      reply.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })
    }

    await knex('transactions').insert({
      title,
      amount: type === 'credit' ? amount : amount * -1,
      session_id: sessionId,
    })

    return reply.status(201).send()
  })
}
