import { prisma } from '@/lib/prisma.ts'
import type {
  CheckInModel,
  CheckInUncheckedCreateInput,
} from '~/generated/prisma/models.ts'
import type { CheckInsRepository } from '../check-ins-repository.ts'

export class PrismaCheckInsRepository implements CheckInsRepository {
  async findByUserIdOnDate(userId: string, date: Date) {
    return null
  }

  async findManyByUserId(userId: string, page: number) {
    const checkIns = await prisma.checkIn.findMany({
      where: { user_id: userId },
      skip: (page - 1) * 20,
      take: 20,
    })

    return checkIns
  }

  async countByUserId(userId: string) {
    const checkInsCount = await prisma.checkIn.count({
      where: { user_id: userId },
    })

    return checkInsCount
  }

  async create(data: CheckInUncheckedCreateInput) {
    const checkIn = await prisma.checkIn.create({
      data,
    })

    return checkIn
  }
}
