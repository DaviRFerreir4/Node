import type {
  CheckInUncheckedCreateInput,
  CheckInModel,
} from '~/generated/prisma/models.ts'

export interface CheckInsRepository {
  findByUserIdOnDate: (
    userId: string,
    date: Date
  ) => Promise<CheckInModel | null>
  findManyByUserId: (userId: string, page: number) => Promise<CheckInModel[]>
  create: (data: CheckInUncheckedCreateInput) => Promise<CheckInModel>
}
