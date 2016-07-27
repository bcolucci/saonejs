
import R from 'ramda'
import transformStream from '../streams/transformStream'

/**
 * Pipe a stream into a transform stream
 */
export default (stream, transformer: Function = R.identity) =>
  stream.pipe(transformStream({ transformer }))
