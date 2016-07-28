
import { identity } from 'ramda'
import { Transform } from 'stream'

/**
 * Creates a Readable/Writable stream
 */
export default (transformer: Function = identity): Transform => {
  const stream = new Transform({ objectMode: true })
  stream._read = () => {}
  stream._write = (chunk, _, callback) => {
    stream.emit('data', transformer(chunk))
    callback()
  }
  return stream
}