import fastify from 'fastify'

const PORT = 3333

const app = fastify()

app.get('/hello', () => 'hello world')

app.listen({ port: PORT }).then(() => {
  console.log(`Server is running on port${PORT}`)
})
