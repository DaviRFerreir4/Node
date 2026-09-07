import fastify from 'fastify'
import { knex } from './database.ts'
import { env } from './env/index.ts'

const app = fastify()

app.get('/hello', async () => {
  const tables = await knex('sqlite_schema').select('*')
  return tables
})

app.listen({ port: env.PORT }).then(() => {
  console.log(`Server is running on port ${env.PORT}`)
})
