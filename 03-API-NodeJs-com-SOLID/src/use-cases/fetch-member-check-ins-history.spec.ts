import { describe, expect, it, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository.ts'
import { FetchUserCheckInsHistoryUseCase } from './fetch-member-check-ins-history.ts'

let checkInsRepository: InMemoryCheckInsRepository
let sut: FetchUserCheckInsHistoryUseCase

describe('Fetch Member Check Ins History Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new FetchUserCheckInsHistoryUseCase(checkInsRepository)
  })

  it('should be able to fetch the check ins history for a member', async () => {
    await checkInsRepository.create({ gym_id: 'gym-01', user_id: 'user-01' })
    await checkInsRepository.create({ gym_id: 'gym-02', user_id: 'user-01' })

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 1,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ user_id: 'user-01', gym_id: 'gym-01' }),
      expect.objectContaining({ user_id: 'user-01', gym_id: 'gym-02' }),
    ])
  })

  it('should be able to fetch paginated check ins history', async () => {
    for (let i = 1; i < 23; i++) {
      await checkInsRepository.create({
        gym_id: `gym-${i.toLocaleString('en-US', { minimumIntegerDigits: 2 })}`,
        user_id: 'user-01',
      })
    }

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 2,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ user_id: 'user-01', gym_id: 'gym-21' }),
      expect.objectContaining({ user_id: 'user-01', gym_id: 'gym-22' }),
    ])
  })
})
