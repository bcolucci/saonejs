
import { Stream } from 'stream'
import pipe from '../utils/pipe'

/**
 * Map a stream
 */
export default (opts = { transformer: Function }): Function =>
  (stream): Stream =>
    pipe(opts.transformer)(stream)
