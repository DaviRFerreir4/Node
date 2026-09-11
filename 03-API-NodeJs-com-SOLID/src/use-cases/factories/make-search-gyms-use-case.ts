import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository.ts'
import { SearchGymsUseCase } from '../search-gyms.ts'

export function makeSearchGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const searchGymsUseCase = new SearchGymsUseCase(gymsRepository)

  return searchGymsUseCase
}
