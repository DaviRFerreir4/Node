import { describe, expect, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository.ts'
import { ValidateCheckInUseCase } from './validate-check-in.ts'
import { ResourceNotFoundError } from './errors/resource-not-found-error.ts'

let checkInsRepository: InMemoryCheckInsRepository
let sut: ValidateCheckInUseCase

describe('Validate Check In Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new ValidateCheckInUseCase(checkInsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to validate check in', async () => {
    const createdCheckIn = await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    const { checkIn } = await sut.execute({ checkInId: createdCheckIn.id })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
  })

  it('should not be able to validate an inexisting check in', async () => {
    await expect(
      sut.execute({ checkInId: 'invalid-check-in-id' })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to validate a check in past 20 minutes from his creation', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40, 0))

    const checkIn = await checkInsRepository.create({
      user_id: 'user-01',
      gym_id: 'gym-01',
    })

    const THIRD_MINUTES_IN_MILLISECONDS = 1000 * 60 * 30

    vi.advanceTimersByTime(THIRD_MINUTES_IN_MILLISECONDS)

    await expect(sut.execute({ checkInId: checkIn.id })).rejects.toBeInstanceOf(
      Error
    )
  })
})
