import type { GymsRepository } from '@/repositories/gyms-repository.ts'
import type { GymModel } from '~/generated/prisma/models.ts'

interface CreateGymUseCaseRequest {
  name: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

interface CreateGymUseCaseResponse {
  gym: GymModel
}

export class CreateGymUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    name,
    description,
    phone,
    latitude,
    longitude,
  }: CreateGymUseCaseRequest) {
    const gym = await this.gymsRepository.create({
      name,
      description,
      phone,
      latitude,
      longitude,
    })

    return { gym }
  }
}
