import type {
  GymUncheckedCreateInput,
  GymModel,
} from '~/generated/prisma/models.ts'

export interface FindManyNearbyParams {
  latitude: number
  longitude: number
  page: number
}

export interface GymsRepository {
  findManyNearby: (params: FindManyNearbyParams) => Promise<GymModel[]>
  searchMany: (query: string, page: number) => Promise<GymModel[]>
  findById: (id: string) => Promise<GymModel | null>
  create: (data: GymUncheckedCreateInput) => Promise<GymModel>
}
