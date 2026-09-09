import { prisma } from '@/lib/prisma.ts'
import type { CheckInUncheckedCreateInput } from '~/generated/prisma/models.ts'
import type { CheckInsRepository } from '../check-ins-repository.ts'

export class PrismaCheckInsRepository implements CheckInsRepository {
  async create(data: CheckInUncheckedCreateInput) {
    const checkIn = await prisma.checkIn.create({
      data,
    })

    return checkIn
  }
}
