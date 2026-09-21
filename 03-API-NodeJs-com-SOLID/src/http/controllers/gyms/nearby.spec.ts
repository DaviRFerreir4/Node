import { app } from '@/app.ts'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user.ts'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Search Nearby Gym E2E', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search for a gym nearby user', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post('/gyms/create')
      .auth(token, { type: 'bearer' })
      .send({
        name: 'Test Gym',
        description: null,
        phone: '+55 (19) 94002-8922',
        latitude: -22.6796219,
        longitude: -47.6151591,
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .auth(token, { type: 'bearer' })
      .query({ latitude: -22.6796202, longitude: -47.6151581 })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('gyms')
    expect(response.body.gyms).toHaveLength(1)
  })
})
