import type {
  GymUncheckedCreateInput,
  GymModel,
} from '~/generated/prisma/models.ts'

export interface GymsRepository {
  findById: (id: string) => Promise<GymModel | null>
  searchMany: (query: string, page: number) => Promise<GymModel[]>
  create: (data: GymUncheckedCreateInput) => Promise<GymModel>
}
