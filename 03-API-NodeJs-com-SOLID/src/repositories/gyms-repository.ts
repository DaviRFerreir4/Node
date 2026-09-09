import type { GymModel } from '~/generated/prisma/models.ts'

export interface GymsRepository {
  findById: (id: string) => Promise<GymModel | null>
}
