import type { GymCreateInput } from '~/generated/prisma/models.ts'
import type { GymsRepository } from '../gyms-repository.ts'
import { prisma } from '@/lib/prisma.ts'

export class PrismaGymsRepository implements GymsRepository {
  async findById(id: string) {
    const gym = prisma.gym.findFirst({ where: { id } })

    return gym
  }

  async create(data: GymCreateInput) {
    const gym = prisma.gym.create({ data })

    return gym
  }
}
