
import { identity } from 'ramda'
import { Stream } from 'stream'
import createStream from '../streams/stream'

/**
 * Pipe a stream into a transform stream
 * @param {Function} transformer The transform function we can apply on each stream element
 * @returns {Stream} The piped stream
 */
export default (transformer: Function = identity): Function =>
  (source: Stream): Stream =>
    source.pipe(createStream(transformer))
