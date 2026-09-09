import { prisma } from '@/lib/prisma.ts'
import type { UserCreateInput } from '~/generated/prisma/models.ts'
import type { UsersRepository } from '../users-repository.ts'

export class PrismaUsersRepository implements UsersRepository {
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    })

    return user
  }

  async create(data: UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }
}
