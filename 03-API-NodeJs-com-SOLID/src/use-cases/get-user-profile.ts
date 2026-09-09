import type { UsersRepository } from '@/repositories/users-repository.ts'
import type { UserModel } from '~/generated/prisma/models.ts'
import { ResourceNotFoundError } from './errors/resource-not-found-error.ts'

interface GetUserProfileUseCaseRequest {
  id: string
}

interface GetUserProfileUseCaseResponse {
  user: UserModel
}

export class GetUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    id,
  }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return { user }
  }
}
