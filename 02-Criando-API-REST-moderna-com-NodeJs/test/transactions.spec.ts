import { expect, beforeAll, describe, it, afterAll } from 'vitest'
import { app } from '../src/app'
import request from 'supertest'

describe('transactions', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should let the user create a new request', async () => {
    const response = await request(app.server)
      .post('/transactions')
      .send({ title: 'Test Transaction', amount: 5000, type: 'credit' })

    expect(response.statusCode).toEqual(201)
  })
})
