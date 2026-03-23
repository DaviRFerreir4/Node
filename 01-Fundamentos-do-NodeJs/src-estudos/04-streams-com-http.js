import { createServer } from 'node:http'
import { Transform } from 'node:stream'

class InvertNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1

    console.log(transformed)

    callback(null, Buffer.from(String(transformed)))
  }
}

const server = createServer(async (req, res) => {
  const buffers = []

  for await (const chunck of req.pipe(new InvertNumberStream)) {
    buffers.push(chunck)
  }

  const fullStreamContent = Buffer.concat(buffers).toString()

  console.log(fullStreamContent)

  return res.end(fullStreamContent)

  // return req
  //   .pipe(new InvertNumberStream())
  //   .pipe(res)
})

server.listen(3334)