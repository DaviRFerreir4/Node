import fastify from 'fastify'
import { appRoutes } from './http/routes.ts'
import z, { ZodError } from 'zod'
import { env } from './env/index.ts'

export const app = fastify()

app.register(appRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation Error', issues: z.treeifyError(error) })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO enviar o log para uma ferramenta externa como DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: 'Internal Server Error' })
})
