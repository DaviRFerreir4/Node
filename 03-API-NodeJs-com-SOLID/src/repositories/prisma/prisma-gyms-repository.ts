import type {
  GymCreateInput,
  GymModel,
} from '~/prisma/generated/prisma/models.ts'
import type {
  FindManyNearbyParams,
  GymsRepository,
} from '../gyms-repository.ts'
import { prisma, schema } from '@/lib/prisma.ts'
import { Prisma } from '~/prisma/generated/prisma/client.ts'

export class PrismaGymsRepository implements GymsRepository {
  async findManyNearby({ latitude, longitude, page }: FindManyNearbyParams) {
    const gyms = await prisma.$queryRaw<GymModel[]>`
      SELECT * FROM ${Prisma.raw(`"${schema}"."gyms"`)}
      WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
      LIMIT ${20} OFFSET ${(page - 1) * 20};
    `

    return gyms
  }

  async searchMany(query?: string, page: number = 1) {
    const gyms = await prisma.gym.findMany({
      ...(query ? { where: { name: { contains: query.trim() } } } : {}),
      skip: (page - 1) * 20,
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
