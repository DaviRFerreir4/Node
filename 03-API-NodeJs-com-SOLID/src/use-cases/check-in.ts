import type { CheckInsRepository } from '@/repositories/check-ins-repository.ts'
import type { GymsRepository } from '@/repositories/gyms-repository.ts'
import type { CheckInModel } from '~/generated/prisma/models.ts'
import { ResourceNotFoundError } from './errors/resource-not-found-error.ts'
import { getDistanceBetweenCordinates } from '@/utils/get-distance-between-cordinates.ts'

interface CheckInUseCaseRequest {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

interface CheckInUseCaseResponse {
  checkIn: CheckInModel
}

export class CheckInUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository,
    private gymsRepository: GymsRepository
  ) {}

  async execute({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFoundError()
    }

    const distanceBetweenUserAndGym = getDistanceBetweenCordinates(
      { latitude: userLatitude, longitude: userLongitude },
      { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() }
    )

    const MAX_DISTANCE_IN_KILOMETERS = 0.1

    if (distanceBetweenUserAndGym > MAX_DISTANCE_IN_KILOMETERS) {
      throw new Error('')
    }

    const checkInOnSameDate = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      new Date()
    )

    if (checkInOnSameDate) {
      throw new Error('')
    }

    const checkIn = await this.checkInsRepository.create({
      user_id: userId,
      gym_id: gymId,
    })

    return { checkIn }
  }
}
