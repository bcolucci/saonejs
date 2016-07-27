
import { Stream } from 'stream'
import pipe from '../utils/pipe'

const log = function () {
  const args = Array.from(arguments)
  console.log.apply(null, args)
  return args.length === 1 ? args[0] : args
}

/**
 * Logs stream data and returns the stream
 */
export default (): Function =>
  (stream): Stream =>
    pipe(log)(stream)
