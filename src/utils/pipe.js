
import { identity } from 'ramda'
import { Stream } from 'stream'
import createStream from '../streams/stream'

/**
 * Pipe a stream into a transform stream
 */
export default (transformer: Function = identity): Function =>
  (source: Stream): Stream =>
    source.pipe(createStream(transformer))
