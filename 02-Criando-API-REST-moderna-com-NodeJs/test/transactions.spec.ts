import { expect, beforeAll, describe, it, afterAll } from 'vitest'
import { app } from '../src/app'
import request from 'supertest'

describe('Transactions Routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a new transaction', async () => {
    const response = await request(app.server)
      .post('/transactions')
      .send({ title: 'Test Transaction', amount: 5000, type: 'credit' })

    expect(response.statusCode).toEqual(201)
  })

  it('should be able to list all transactions', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({ title: 'Test Transaction', amount: 5000, type: 'credit' })

    const cookies = createTransactionResponse.get('Set-Cookie')

    const response = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies ?? [])

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      transactions: [
        expect.objectContaining({ title: 'Test Transaction', amount: 5000 }),
      ],
    })
  })
})
