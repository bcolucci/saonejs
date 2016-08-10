
import { identity } from 'ramda'
import { Stream } from 'stream'
import createStream from '../streams/stream'

/**
 * Pipe a stream into a transform stream
 * @param {Function} transform The transform function we can apply on each stream element
 * @returns {Stream} The piped stream
 */
export default (transform: Function = identity): Function =>
  (source: Stream): Stream => {

  const target = createStream({
    processName: transform.name,
    path: source.path,
    transform
  })

  return source.pipe(target)
}
