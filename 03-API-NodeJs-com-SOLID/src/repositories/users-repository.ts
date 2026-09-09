import type { UserCreateInput, UserModel } from '~/generated/prisma/models.ts'

export interface UsersRepository {
  findByEmail: (email: string) => Promise<UserModel | null>
  create: (data: UserCreateInput) => Promise<UserModel>
}
