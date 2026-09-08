import { expect, beforeAll, describe, it, afterAll, beforeEach } from 'vitest'
import { app } from '../src/app'
import request from 'supertest'
import { execSync } from 'node:child_process'

describe('Transactions Routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(() => {
    execSync('npm run knex -- migrate:rollback --all')
    execSync('npm run knex -- migrate:latest')
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

  it('should be able to get a specific transaction', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({ title: 'Test Transaction', amount: 5000, type: 'credit' })

    const cookies = createTransactionResponse.get('Set-Cookie')

    const listTransactionsResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies ?? [])

    const transactionId = listTransactionsResponse.body.transactions[0].id

    const response = await request(app.server)
      .get(`/transactions/${transactionId}`)
      .set('Cookie', cookies ?? [])

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      transaction: expect.objectContaining({
        id: transactionId,
        title: 'Test Transaction',
        amount: 5000,
      }),
    })
  })

  it('should be able to get the summary', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({ title: 'Test Transaction Credit', amount: 5000, type: 'credit' })

    const cookies = createTransactionResponse.get('Set-Cookie')

    await request(app.server)
      .post('/transactions')
      .send({ title: 'Test Transaction Debit', amount: 2350, type: 'debit' })
      .set('Cookie', cookies ?? [])

    const response = await request(app.server)
      .get('/transactions/summary')
      .set('Cookie', cookies ?? [])

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      summary: expect.objectContaining({ amount: 2650 }),
    })
  })
})
