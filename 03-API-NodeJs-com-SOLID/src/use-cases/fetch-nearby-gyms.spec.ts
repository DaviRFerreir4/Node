import type { GymsRepository } from '@/repositories/gyms-repository.ts'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository.ts'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms.ts'

let gymsRepository: GymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    for (let i = 1; i < 25; i++) {
      await gymsRepository.create({
        name: `Test Gym ${i.toLocaleString('en-US', { minimumIntegerDigits: 2 })}`,
        description: `Test Gym ${i.toLocaleString('en-US', { minimumIntegerDigits: 2 })} Description`,
        phone: null,
        latitude: 0,
        longitude: 0,
      })
    }

    for (let i = 1; i < 3; i++) {
      await gymsRepository.create({
        name: `Nearby Gym ${i.toLocaleString('en-US', { minimumIntegerDigits: 2 })}`,
        description: `Nearby Gym ${i.toLocaleString('en-US', { minimumIntegerDigits: 2 })} Description`,
        phone: null,
        latitude: -22.6796219,
        longitude: -47.6151591,
      })
    }

    const { gyms } = await sut.execute({
      userLatitude: -22.6796202,
      userLongitude: -47.6151581,
      page: 1,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ name: 'Nearby Gym 01' }),
      expect.objectContaining({ name: 'Nearby Gym 02' }),
    ])
  })
})
