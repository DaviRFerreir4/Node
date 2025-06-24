import http from 'node:http';

const server = http.createServer((req, res) => {
  const { method, url } = req;

  console.log(method, url);

  if (method === 'GET' && url === '/users') {
    console.log("Listando usuários");
  }
  if (method === 'POST' && url === '/users') {
    console.log("Criando um usuário");
  }

  return res.end(`Hello, World!\n\nMetodo: ${method}\nUrl: ${url}`);
});

server.listen(3333);