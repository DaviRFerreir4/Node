import type { UserCreateInput, UserModel } from '~/generated/prisma/models.ts'

export interface UsersRepository {
  findById: (id: string) => Promise<UserModel | null>
  findByEmail: (email: string) => Promise<UserModel | null>
  create: (data: UserCreateInput) => Promise<UserModel>
}
