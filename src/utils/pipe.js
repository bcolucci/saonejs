
import { identity } from 'ramda'
import { Stream } from 'stream'
import stream from '../streams/stream'

/**
 * Pipe a stream into a transform stream
 */
export default (transformer: Function = identity): Function =>
  (source: Stream): Stream =>
    source.pipe(stream(transformer))
