
import R from 'ramda'
import { Transform } from 'stream'

export default (params: Object = { transformer: Function = R.identity }): Transform => {
  const stream = new Transform(Object.assign({}, params, { objectMode: true }))
  stream._read = () => {}
  stream._write = (chunk, encoding, callback) => {
    stream.emit('data', params.transformer(chunk))
    callback()
  }
  return stream
}
