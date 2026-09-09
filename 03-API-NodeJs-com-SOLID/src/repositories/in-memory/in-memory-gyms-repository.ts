import type { GymCreateInput, GymModel } from '~/generated/prisma/models.ts'
import type { GymsRepository } from '../gyms-repository.ts'
import { randomUUID } from 'node:crypto'
import { Decimal } from '@prisma/client/runtime/client'

export class InMemoryGymsRepository implements GymsRepository {
  public items: GymModel[] = []

  async findById(id: string) {
    const gym = this.items.find((item) => item.id === id)

    return gym ?? null
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
