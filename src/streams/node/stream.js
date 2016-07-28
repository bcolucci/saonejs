
import { identity } from 'ramda'
import { Transform } from 'stream'

/**
 * Creates a Readable/Writable stream
 */
let i = 0;
export default (transformer: Function = identity): Transform => {
  console.log('new stream', i++);
  const stream = new Transform({ objectMode: true })
  stream._read = () => {}
  stream._write = (chunk, _, callback) => {
    stream.emit('data', transformer(chunk))
    callback()
  }
  return stream
}
