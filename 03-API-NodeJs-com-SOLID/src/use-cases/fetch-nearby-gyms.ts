import type { GymsRepository } from '@/repositories/gyms-repository.ts'
import type { GymModel } from '~/generated/prisma/models.ts'

interface FetchNearbyGymsUseCaseRequest {
  userLatitude: number
  userLongitude: number
  page: number
}

interface FetchNearbyGymsUseCaseResponse {
  gyms: GymModel[]
}

export class FetchNearbyGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
    page,
  }: FetchNearbyGymsUseCaseRequest): Promise<FetchNearbyGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
      page,
    })

    return { gyms }
  }
}
