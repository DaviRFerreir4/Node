import { describe, expect, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository.ts'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository.ts'
import { CheckInUseCase } from './check-in.ts'
import { CheckInLimitError } from './errors/check-in-limit-error.ts'
import { MaxDistanceError } from './errors/max-distance-error.ts'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check In Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const gym = await gymsRepository.create({
      name: 'Test Gym',
      description: 'Test Gym Description',
      phone: '5542940028922',
      latitude: -22.6796219,
      longitude: -47.6151591,
    })

    const { checkIn } = await sut.execute({
      gymId: gym.id,
      userId: 'user-01',
      userLatitude: -22.6796219,
      userLongitude: -47.6151591,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should be able to check in once each day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    const gym = await gymsRepository.create({
      name: 'Test Gym',
      description: 'Test Gym Description',
      phone: '5542940028922',
      latitude: -22.6796219,
      longitude: -47.6151591,
    })

    await sut.execute({
      gymId: gym.id,
      userId: 'user-01',
      userLatitude: -22.6796219,
      userLongitude: -47.6151591,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: gym.id,
      userId: 'user-01',
      userLatitude: -22.6796219,
      userLongitude: -47.6151591,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    const gym = await gymsRepository.create({
      name: 'Test Gym',
      description: 'Test Gym Description',
      phone: '5542940028922',
      latitude: -22.6796219,
      longitude: -47.6151591,
    })

    await sut.execute({
      gymId: gym.id,
      userId: 'user-01',
      userLatitude: -22.6796219,
      userLongitude: -47.6151591,
    })

    await expect(
      sut.execute({
        gymId: gym.id,
        userId: 'user-01',
        userLatitude: -22.6796219,
        userLongitude: -47.6151591,
      })
    ).rejects.toBeInstanceOf(CheckInLimitError)
  })

  it('should not be able to check in on a distant gym', async () => {
    const gym = await gymsRepository.create({
      name: 'Test Gym',
      description: 'Test Gym Description',
      phone: '5542940028922',
      latitude: -21.6796219,
      longitude: -46.6151591,
    })

    await expect(
      sut.execute({
        gymId: gym.id,
        userId: 'user-01',
        userLatitude: -22.6796219,
        userLongitude: -47.6151591,
      })
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
