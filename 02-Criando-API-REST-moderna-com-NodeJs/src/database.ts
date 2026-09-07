import knexConfig from 'knex'

export const knex = knexConfig({
  client: 'better-sqlite3',
  connection: {
    filename: './tmp/app.db',
  },
  useNullAsDefault: true,
})
