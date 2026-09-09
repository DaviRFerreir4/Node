import type {
  CheckInUncheckedCreateInput,
  CheckInModel,
} from '~/generated/prisma/models.ts'

export interface CheckInsRepository {
  findByUserIdOnDate: (
    userId: string,
    date: Date
  ) => Promise<CheckInModel | null>
  create: (data: CheckInUncheckedCreateInput) => Promise<CheckInModel>
}
