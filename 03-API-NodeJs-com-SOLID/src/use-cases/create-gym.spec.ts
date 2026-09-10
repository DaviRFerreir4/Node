import type { GymsRepository } from '@/repositories/gyms-repository.ts'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository.ts'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateGymUseCase } from './create-gym.ts'

let gymsRepository: GymsRepository
let sut: CreateGymUseCase

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('should be able to create a gym', async () => {
    const { gym } = await sut.execute({
      name: 'Test Gym',
      description: 'Test Gym Description',
      phone: null,
      latitude: 0,
      longitude: 0,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
