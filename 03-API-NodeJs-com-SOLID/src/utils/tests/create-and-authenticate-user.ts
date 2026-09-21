import request from 'supertest'
import type { FastifyInstance } from 'fastify'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await request(app.server).post('/users').send({
    name: 'John Doe',
    email: 'john.doe@email.com',
    password: 'drowssap',
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'john.doe@email.com',
    password: 'drowssap',
  })

  const { token } = authResponse.body

  return { token }
}
