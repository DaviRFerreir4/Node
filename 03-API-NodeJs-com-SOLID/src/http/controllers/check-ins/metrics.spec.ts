import { app } from '@/app.ts'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user.ts'
import request from 'supertest'
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest'

describe('Check-ins Metrics E2E', () => {
  beforeAll(async () => {
    await app.ready()
  })

  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterAll(async () => {
    await app.close()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to get user check-ins metrics (count)', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

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

    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await request(app.server)
      .post(`/gyms/${gymId}/check-in`)
      .auth(token, { type: 'bearer' })
      .send({
        latitude: -21.6796211,
        longitude: -46.6151603,
      })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    await request(app.server)
      .post(`/gyms/${gymId}/check-in`)
      .auth(token, { type: 'bearer' })
      .send({
        latitude: -21.6796211,
        longitude: -46.6151603,
      })

    vi.setSystemTime(new Date(2022, 0, 22, 8, 0, 0))

    await request(app.server)
      .post(`/gyms/${gymId}/check-in`)
      .auth(token, { type: 'bearer' })
      .send({
        latitude: -21.6796211,
        longitude: -46.6151603,
      })

    const response = await request(app.server)
      .get('/check-ins/metrics')
      .auth(token, { type: 'bearer' })

    expect(response.status).toBe(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        checkInsCount: 3,
      })
    )
  })
})
