import type {
  CheckInUncheckedCreateInput,
  CheckInModel,
} from '~/generated/prisma/models.ts'
import type { CheckInsRepository } from '../check-ins-repository.ts'
import { randomUUID } from 'node:crypto'
import dayjs from 'dayjs'

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckInModel[] = []

  async findManyByUserId(userId: string, page: number) {
    const checkIns = this.items
      .filter((item) => item.user_id === userId)
      .slice((page - 1) * 20, page * 20)

    return checkIns
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfDay = dayjs(date).startOf('date')
    const endOfDay = dayjs(date).endOf('date')

    const checkInOnSameDate = this.items.find((item) => {
      const checkInDay = dayjs(item.created_at)

      const isOnSameDay =
        checkInDay.isAfter(startOfDay) && checkInDay.isBefore(endOfDay)

      return item.user_id === userId && isOnSameDay
    })

    return checkInOnSameDate ?? null
  }

  async countByUserId(userId: string) {
    const checkInsCount = this.items.length

    return checkInsCount
  }

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
