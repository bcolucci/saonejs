
import R from 'ramda'
import { Transform } from 'stream'

/**
 * TODO
 */
export default (opts = { transformer: Function = R.identity }): Transform => {
  const streamOpts = Object.assign({}, opts, { objectMode: true })
  const stream = new Transform(streamOpts)
  stream._read = () => {}
  stream._write = (chunk, _, callback) => {
    stream.emit('data', opts.transformer(chunk))
    callback()
  }
  return stream
}
