import { app } from '@/app.ts'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user.ts'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create Gym E2E', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a gym', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    const response = await request(app.server)
      .post('/gyms/create')
      .auth(token, { type: 'bearer' })
      .send({
        name: 'Test Gym',
        description: null,
        phone: '+55 (19) 94002-8922',
        latitude: -21.6796219,
        longitude: -46.6151591,
      })

    expect(response.status).toBe(201)
  })
})
