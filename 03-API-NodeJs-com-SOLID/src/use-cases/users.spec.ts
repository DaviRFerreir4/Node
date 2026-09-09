import { describe, expect, it } from 'vitest'
import { RegisterUseCase } from './users.ts'
import { compare } from 'bcryptjs'

describe('Register Use Case', () => {
  it('should hash user password upon registration', async () => {
    const registerUseCase = new RegisterUseCase({
      findByEmail: async (email) => {
        return null
      },
      create: async (data) => {
        return {
          id: 'user-1',
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          created_at: new Date(),
        }
      },
    })

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
})
