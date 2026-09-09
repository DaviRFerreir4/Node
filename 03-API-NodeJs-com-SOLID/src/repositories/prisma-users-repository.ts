import { prisma } from '@/lib/prisma.ts'
import type { Prisma } from '~/generated/prisma/client.ts'
import type { UserCreateInput } from '~/generated/prisma/models.ts'

export class PrismaUsersRepository {
  async create(data: UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }
}
