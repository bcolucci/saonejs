
import { deepEqual } from 'assert'
import { createServer } from 'net'
import socket from '../../src/streams/sources/socket'

const port = 12345

describe('sources/socket', () => {

  before(() => {
    const server = createServer(socket => {
      let i = 0
      const ctx = setInterval(() => {
        socket.write(String(++i))
        if (i === 5) {
          clearInterval(ctx)
          socket.end()
          server.close()
        }
      }, 10)
    })
    server.listen(port)
  })

  it('should receive data from a socket', done => {
    const { stream, listen } = socket({ port })
    const received = []
    stream.on('data', received.push.bind(received))
    stream.on('end', () => {
      deepEqual(received.map(Number), [ 1, 2, 3, 4, 5 ])
      done()
    })
    listen()
  })

})
