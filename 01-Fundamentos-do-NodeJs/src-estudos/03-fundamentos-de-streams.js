// process.stdin
//   .pipe(process.stdout)

import { Readable, Writable, Transform } from 'node:stream'

class OneToOneHundredStream extends Readable {
  index = 1

  _read() {
    const i = this.index++

    setTimeout(() => {
      if (i > 100) {
        this.push(null)
      } else {
        const buff = Buffer.from(String(i))
        
        this.push(buff)
      }
    }, 1000);
  }
}

class InvertNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1
    callback(null, Buffer.from(String(transformed)))
  }
}

// new OneToOneHundredStream()
//   .pipe(process.stdout)

class MultiplyByTenStream extends Writable {

  // chunck: pedaço que vem de uma stream de leitura
  // encoding: como a informação está codificada
  // callback: função para encerrar
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10)
    callback()
  }
}

// new OneToOneHundredStream()
//   .pipe(new MultiplyByTenStream())

new OneToOneHundredStream()
  .pipe(new InvertNumberStream())
  .pipe(new MultiplyByTenStream())

// Existe também a stream duplex que age tanto como uma stream de leitura quando de escrita