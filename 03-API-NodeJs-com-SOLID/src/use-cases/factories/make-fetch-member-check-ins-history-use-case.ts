import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository.ts'
import { FetchUserCheckInsHistoryUseCase } from '../fetch-member-check-ins-history.ts'

export function makeFetchMemberCheckInsHistoryUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const fetchMemberCheckInsHistoryUseCase = new FetchUserCheckInsHistoryUseCase(
    checkInsRepository
  )

  return fetchMemberCheckInsHistoryUseCase
}
