
import { identity } from 'ramda'
import { Transform } from 'stream'
import { generate as newId } from 'shortid'

const createStream = (opts = {
  processName: null,
  customName: null,
  path: [],
  transform: identity
}): Transform => {

  const { processName, customName, path, transform } = opts

  const stream = new Transform({ objectMode: true })

  stream.id = newId() + Date.now().toString(16)

  stream.path = [].concat(path).concat({
    id: stream.id,
    processName,
    customName,
    createdAt: Date.now()
  })

  stream._read = () => {}

  stream._write = (chunk, _, callback) => {
    stream.emit('data', transform(chunk))
    callback()
  }

  stream.on('error', console.error.bind(console))

  return stream
}

export default createStream
