import fastify from 'fastify'
import { usersRoutes } from './http/controllers/users/routes.ts'
import { gymsRoutes } from './http/controllers/gyms/routes.ts'
import z, { ZodError } from 'zod'
import { env } from './env/index.ts'
import fastifyJwt from '@fastify/jwt'
import { checkInsRoutes } from './http/controllers/check-ins/routes.ts'

export const app = fastify()

app.register(fastifyJwt, { secret: env.JWT_SECRET })

app.register(usersRoutes)
app.register(gymsRoutes)
app.register(checkInsRoutes)

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
