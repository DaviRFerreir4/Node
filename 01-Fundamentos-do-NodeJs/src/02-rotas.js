import http from 'node:http'

const users = []

const server = http.createServer((req, res) => {
  const { method, url } = req

  console.log(method, url)

  if (method === 'GET' && url === '/users') {
    return res.setHeader('Content-Type', 'aplication/json').end(JSON.stringify(users))
  }
  if (method === 'POST' && url === '/users') {
    users.push({
      id: 1,
      name: "John Doe",
      email: "johndoe@email.com"
    })
    return res.writeHead(201).end("Criando um usuário")
  }

  return res.writeHead(404).end(`Hello, World!\n\nMetodo: ${method}\nUrl: ${url}`);
});

server.listen(3333);