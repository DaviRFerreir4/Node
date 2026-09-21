import { app } from '@/app.ts'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Refresh E2E', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh a token', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'john.doe@email.com',
      password: 'drowssap',
    })

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'john.doe@email.com',
      password: 'drowssap',
    })

    const cookies = authResponse.get('Set-Cookie') ?? []

    const response = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)
      .send()

    expect(response.status).toBe(200)
    expect(response.body).toEqual({ token: expect.any(String) })
    expect(response.get('Set-Cookie')).toEqual(
      expect.arrayContaining([expect.stringContaining('refreshToken')])
    )
  })
})
