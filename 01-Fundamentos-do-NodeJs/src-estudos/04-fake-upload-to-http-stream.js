import { Readable } from 'node:stream'

class OneToOneHundredStream extends Readable {
  index = 1

  _read() {
    const i = this.index++

    setTimeout(() => {
      if (i > 10) {
        this.push(null)
      } else {
        const buff = Buffer.from(String(i))
        
        this.push(buff)
      }
    }, 1000);
  }
}

fetch('http://localhost:3334', {
  method: 'POST',
  body: new OneToOneHundredStream(),
  duplex: "half"
}).then((res) => {
  return res.text()
}).then((data) => {
  console.log(data)
})