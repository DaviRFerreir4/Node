import { app } from '@/app.ts'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user.ts'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create Check-In E2E', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a check-in', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post('/gyms/create')
      .auth(token, { type: 'bearer' })
      .send({
        name: 'Test Gym',
        description: null,
        phone: '+55 (19) 94002-8922',
        latitude: -21.6796219,
        longitude: -46.6151591,
      })

    const gymsResponse = await request(app.server)
      .get('/gyms/search')
      .auth(token, { type: 'bearer' })
      .query({ query: 'Test' })

    const gymId = gymsResponse.body.gyms[0].id

    const response = await request(app.server)
      .post(`/gyms/${gymId}/check-in`)
      .auth(token, { type: 'bearer' })
      .send({
        latitude: -21.6796211,
        longitude: -46.6151603,
      })

    expect(response.status).toBe(201)
  })
})
