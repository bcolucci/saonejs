
import { Readable } from 'stream'

/**
 * Returns an empty readable stream
 */
export default (opts = {}): Readable => {
  const streamOpts = Object.assign({}, opts, { objectMode: true })
  const stream = new Readable(streamOpts)
  stream._read = () => {}
  return stream
}
