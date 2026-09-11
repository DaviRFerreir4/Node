import { app } from '@/app.ts'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate E2E', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'john.doe@email.com',
      password: 'drowssap',
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'john.doe@email.com',
      password: 'drowssap',
    })

    expect(response.status).toBe(200)
    expect(response.body).toEqual({ token: expect.any(String) })
  })
})
