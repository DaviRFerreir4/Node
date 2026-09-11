import type { GymCreateInput, GymModel } from '~/generated/prisma/models.ts'
import type {
  FindManyNearbyParams,
  GymsRepository,
} from '../gyms-repository.ts'
import { randomUUID } from 'node:crypto'
import { Decimal } from '@prisma/client/runtime/client'
import { getDistanceBetweenCordinates } from '@/utils/get-distance-between-cordinates.ts'

export class InMemoryGymsRepository implements GymsRepository {
  public items: GymModel[] = []

  async findById(id: string) {
    const gym = this.items.find((item) => item.id === id)

    return gym ?? null
  }

  async findManyNearby(params: FindManyNearbyParams) {
    const gyms = this.items
      .filter((item) => {
        const from = { latitude: params.latitude, longitude: params.longitude }
        const to = {
          latitude: Number(item.latitude.toString()),
          longitude: Number(item.longitude.toString()),
        }

        const distance = getDistanceBetweenCordinates(from, to)

        return distance < 10
      })
      .slice((params.page - 1) * 20, params.page * 20)

    return gyms
  }

  async searchMany(query: string, page: number) {
    const gyms = this.items
      .filter((item) => item.name.includes(query))
      .slice((page - 1) * 20, page * 20)

    return gyms
  }

  async create(data: GymCreateInput) {
    const gym: GymModel = {
      id: randomUUID(),
      name: data.name,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Decimal(Number(data.latitude)),
      longitude: new Decimal(Number(data.longitude)),
    }

    this.items.push(gym)

    return gym
  }
}
