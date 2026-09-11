import type { GymCreateInput, GymModel } from '~/generated/prisma/models.ts'
import type {
  FindManyNearbyParams,
  GymsRepository,
} from '../gyms-repository.ts'
import { prisma } from '@/lib/prisma.ts'

export class PrismaGymsRepository implements GymsRepository {
  async findManyNearby({ latitude, longitude }: FindManyNearbyParams) {
    const gyms = await prisma.$queryRaw<GymModel[]>`
      SELECT * FROM gyms
      WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `

    return gyms
  }

  async searchMany(query: string, page: number) {
    const gyms = await prisma.gym.findMany({
      where: { name: { contains: query } },
      skip: page - 1,
      take: 20,
    })

    return gyms
  }

  async findById(id: string) {
    const gym = prisma.gym.findUnique({ where: { id } })

    return gym
  }

  async create(data: GymCreateInput) {
    const gym = prisma.gym.create({ data })

    return gym
  }
}
