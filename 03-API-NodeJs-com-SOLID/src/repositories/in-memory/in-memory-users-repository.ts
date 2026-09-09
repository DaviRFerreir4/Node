import type { UserCreateInput, UserModel } from '~/generated/prisma/models.ts'
import type { UsersRepository } from '../users-repository.ts'

export class InMemoryUsersRepository implements UsersRepository {
  public items: UserModel[] = []

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    return user ?? null
  }

  async create(data: UserCreateInput) {
    const user = {
      id: 'user-1',
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    }

    this.items.push(user)

    return user
  }
}
