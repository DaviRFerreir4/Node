import { config } from 'dotenv'
import z from 'zod'

if (process.env.NODE_ENV === 'test') {
  config({ path: '.env.test' })
} else {
  config()
}

const envSchema = z.object({
  DATABASE_URL: z.string().default('./db/app.db'),
  DATABASE_CLIENT: z.enum(['better-sqlite3', 'pg']).default('better-sqlite3'),
  PORT: z.coerce.number().default(3333),
  HOST: z.string().default('localhost'),
  NODE_ENV: z
    .enum(['development', 'test', 'uat', 'production'])
    .default('production'),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Variáveis de ambiente inválidas: ', _env.error.format())

  throw new Error('Invalid environment variables')
}

export const env = _env.data
