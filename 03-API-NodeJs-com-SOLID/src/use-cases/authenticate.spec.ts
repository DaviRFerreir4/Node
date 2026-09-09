import { describe, expect, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository.ts'
import { AuthenticateUseCase } from './authenticate.ts'
import { InvalidCredentialsError } from './errors/invalid-credentials-error.ts'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to autheticate', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'john@email.com',
      password_hash: await hash('12345678', 6),
    })

    const { user } = await sut.execute({
      email: 'john@email.com',
      password: '12345678',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to autheticate with wrong email', async () => {
    await expect(
      sut.execute({
        email: 'john@email.com',
        password: '12345678',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to autheticate with wrong password', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'john@email.com',
      password_hash: await hash('12345678', 6),
    })

    await expect(
      sut.execute({
        email: 'john@email.com',
        password: '1234567890',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
