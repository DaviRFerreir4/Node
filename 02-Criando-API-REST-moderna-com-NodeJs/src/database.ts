import knexConfig from 'knex'

export const configs: knexConfig.Knex.Config = {
  client: 'better-sqlite3',
  connection: {
    filename: './db/app.db',
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  },
}

export const knex = knexConfig(configs)
