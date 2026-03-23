import http from 'node:http'
import { json } from './middlewares/07-json.js';

const users = []

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  console.log(method, url)

  await json(req, res)

  if (method === 'GET' && url === '/users') {
    return res.setHeader('Content-Type', 'aplication/json').end(JSON.stringify(users))
  }

  if (method === 'POST' && url === '/users') {
    const { name, email } = req.body

    users.push({
      id: 1,
      name,
      email
    })
    return res.writeHead(201).end("Criando um usuário")
  }

  return res.writeHead(404).end(`Hello, World!\n\nMetodo: ${method}\nUrl: ${url}`);
});

server.listen(3333);