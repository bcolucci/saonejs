
import { Readable } from 'stream'

/**
 * Returns an empty readable stream
 */
export default (opts = {}): Readable => {
  const stream = new Readable(Object.assign({}, opts, { objectMode: true }))
  stream._read = () => {}
  return stream
}
