import type {
  CheckInUncheckedCreateInput,
  CheckInModel,
} from '~/generated/prisma/models.ts'

export interface CheckInsRepository {
  findManyByUserId: (userId: string, page: number) => Promise<CheckInModel[]>
  findById: (id: string) => Promise<CheckInModel | null>
  findByUserIdOnDate: (
    userId: string,
    date: Date
  ) => Promise<CheckInModel | null>
  countByUserId: (userId: string) => Promise<number>
  create: (data: CheckInUncheckedCreateInput) => Promise<CheckInModel>
  save: (checkIn: CheckInModel) => Promise<CheckInModel | null>
}
