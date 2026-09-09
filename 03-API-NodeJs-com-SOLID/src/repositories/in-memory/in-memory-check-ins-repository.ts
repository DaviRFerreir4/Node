import type {
  CheckInUncheckedCreateInput,
  CheckInModel,
} from '~/generated/prisma/models.ts'
import type { CheckInsRepository } from '../check-ins-repository.ts'
import { randomUUID } from 'node:crypto'

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckInModel[] = []

  async create(data: CheckInUncheckedCreateInput) {
    const checkIn: CheckInModel = {
      id: randomUUID(),
      gym_id: data.gym_id,
      user_id: data.user_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    }

    this.items.push(checkIn)

    return checkIn
  }
}
