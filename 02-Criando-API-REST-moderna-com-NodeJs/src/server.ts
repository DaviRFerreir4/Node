import fastify from 'fastify'
import { knex } from './database.ts'

const PORT = 3333

const app = fastify()

app.get('/hello', async () => {
  const tables = await knex('sqlite_schema').select('*')
  return tables
})

app.listen({ port: PORT }).then(() => {
  console.log(`Server is running on port ${PORT}`)
})
