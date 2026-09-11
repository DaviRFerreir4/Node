import type { CheckInsRepository } from '@/repositories/check-ins-repository.ts'
import type { GymsRepository } from '@/repositories/gyms-repository.ts'
import type { CheckInModel } from '~/generated/prisma/models.ts'
import { ResourceNotFoundError } from './errors/resource-not-found-error.ts'
import { getDistanceBetweenCordinates } from '@/utils/get-distance-between-cordinates.ts'
import { MaxDistanceError } from './errors/max-distance-error.ts'
import { CheckInLimitError } from './errors/check-in-limit-error.ts'
import dayjs from 'dayjs'

interface ValidateCheckInUseCaseRequest {
  checkInId: string
}

interface ValidateCheckInUseCaseResponse {
  checkIn: CheckInModel
}

export class ValidateCheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    const checkInFounded = await this.checkInsRepository.findById(checkInId)

    if (!checkInFounded) {
      throw new ResourceNotFoundError()
    }

    const timeAfterCheckInCreationInMinutes = dayjs(new Date()).diff(
      checkInFounded.created_at,
      'minutes'
    )

    if (timeAfterCheckInCreationInMinutes > 20) {
      throw new Error()
    }

    checkInFounded.validated_at = new Date()

    const checkIn = await this.checkInsRepository.save(checkInFounded)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    return { checkIn }
  }
}
