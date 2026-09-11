import type { GymCreateInput } from '~/generated/prisma/models.ts'
import type {
  FindManyNearbyParams,
  GymsRepository,
} from '../gyms-repository.ts'
import { prisma } from '@/lib/prisma.ts'

export class PrismaGymsRepository implements GymsRepository {
  async findById(id: string) {
    const gym = prisma.gym.findFirst({ where: { id } })

    return gym
  }

  async findManyNearby(params: FindManyNearbyParams) {
    return []
  }

  async searchMany(query: string, page: number) {
    const gyms = await prisma.gym.findMany({
      where: { name: { contains: query } },
      skip: page - 1,
      take: 20,
    })

    return gyms
  }

  async create(data: GymCreateInput) {
    const gym = prisma.gym.create({ data })

    return gym
  }
}
