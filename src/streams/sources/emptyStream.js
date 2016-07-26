
import { Readable } from 'stream'

export default (params: Object = {}): Readable => {
  const stream = new Readable(Object.assign({}, params, { objectMode: true }))
  stream._read = () => {}
  return stream
}
