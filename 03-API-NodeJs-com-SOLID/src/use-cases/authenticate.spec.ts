import { describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register.ts'
import { compare, hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository.ts'
import { UserAlreadyExistsError } from './errors/user-already-exists-error.ts'
import { AuthenticateUseCase } from './authenticate.ts'
import { InvalidCredentialsError } from './errors/invalid-credentials-error.ts'

describe('Authenticate Use Case', () => {
  it('should be able to autheticate', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

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
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

    await expect(
      sut.execute({
        email: 'john@email.com',
        password: '12345678',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to autheticate with wrong password', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

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
