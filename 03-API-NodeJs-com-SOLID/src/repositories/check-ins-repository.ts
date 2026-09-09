import type {
  CheckInUncheckedCreateInput,
  CheckInModel,
} from '~/generated/prisma/models.ts'

export interface CheckInsRepository {
  create: (data: CheckInUncheckedCreateInput) => Promise<CheckInModel>
}
