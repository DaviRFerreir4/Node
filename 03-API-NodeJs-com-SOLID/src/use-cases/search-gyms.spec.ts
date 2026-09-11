import type { GymsRepository } from '@/repositories/gyms-repository.ts'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository.ts'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchGymsUseCase } from './search-gyms.ts'

let gymsRepository: GymsRepository
let sut: SearchGymsUseCase

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('should be able to search gyms', async () => {
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
        name: `Selected Gym ${i.toLocaleString('en-US', { minimumIntegerDigits: 2 })}`,
        description: `Selected Gym ${i.toLocaleString('en-US', { minimumIntegerDigits: 2 })} Description`,
        phone: null,
        latitude: 0,
        longitude: 0,
      })
    }

    const { gyms } = await sut.execute({
      query: 'ecte',
      page: 1,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ name: 'Selected Gym 01' }),
      expect.objectContaining({ name: 'Selected Gym 02' }),
    ])
  })
})
