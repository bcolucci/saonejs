
import { identity } from 'ramda'
import { Transform } from 'stream'
import { generate as newId } from 'shortid'

/**
 * Default onStream error function
 */
const defOnError = console.error.bind(console)

/**
 * Creates a Readable/Writable stream
 * @param {Function} transformer
 * @param {Function} onError = defOnError
 */
export default (transformer: Function = identity, onError = defOnError): Transform => {
  const stream = new Transform({ objectMode: true })
  // ex: BkfZWpEMUY36d3bef66acbe, rytWWaVG8Fca3919d95b10e...
  stream.id = newId() + Math.random().toString(16).slice(2)
  stream._read = () => {}
  stream._write = (chunk, _, callback) => {
    stream.emit('data', transformer(chunk))
    callback()
  }
  stream.on('error', onError)
  return stream
}
