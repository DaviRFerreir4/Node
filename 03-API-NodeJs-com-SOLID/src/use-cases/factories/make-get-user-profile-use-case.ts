import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository.ts'
import { GetUserProfileUseCase } from '../get-user-profile.ts'

export function makeGetUserProfileUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const getUserProfileUseCase = new GetUserProfileUseCase(usersRepository)

  return getUserProfileUseCase
}
