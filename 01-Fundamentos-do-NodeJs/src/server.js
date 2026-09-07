import http from 'node:http'
import { json } from './middlewares/json.js'
import { routes } from './routes/index.js'

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  console.log(method, url)

  await json(req, res)

  const route = routes.find(
    (route) => route.method === method && route.path === url
  )

  if (route) {
    return route.handler(req, res)
  }

  return res
    .writeHead(404)
    .end(`Hello, World!\n\nMetodo: ${method}\nUrl: ${url}`)
})

server.listen(3333)
