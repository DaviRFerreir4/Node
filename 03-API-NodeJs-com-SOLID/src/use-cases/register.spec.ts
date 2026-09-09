import { describe, expect, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register.ts'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository.ts'
import { UserAlreadyExistsError } from './errors/user-already-exists-error.ts'

let usersRepository: InMemoryUsersRepository
let registerUseCase: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    registerUseCase = new RegisterUseCase(usersRepository)
  })

  it('should be able to register', async () => {
    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'john@email.com',
      password: '12345678',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'john@email.com',
      password: '12345678',
    })

    const isPasswordCorrectlyHashed = await compare(
      '12345678',
      user.password_hash
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with the same email twice', async () => {
    await registerUseCase.execute({
      name: 'John Doe',
      email: 'john@email.com',
      password: '12345678',
    })

    await expect(
      registerUseCase.execute({
        name: 'John Doe',
        email: 'john@email.com',
        password: '12345678',
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
