import { knex as knexConfig, Knex } from 'knex'
import { env } from './env/index.ts'

export const configs: Knex.Config = {
  client: 'better-sqlite3',
  connection: {
    filename: env.DATABASE_URL,
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  },
}

export const knex = knexConfig(configs)
