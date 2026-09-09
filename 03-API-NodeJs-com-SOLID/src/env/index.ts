import 'dotenv/config'
import z from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string(),
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  PORT: z.coerce.number().default(3333),
  HOST: z.string().default('localhost'),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.log('Invalid Environment Variables', _env.error.format())

  throw new Error('Invalid Environment Variables')
}

export const env = _env.data
