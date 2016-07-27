
//import assert from 'assert'
import { Stream } from 'stream'
import pipe from '../utils/pipe'

// logs and returns something whitout mutations
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
    pipe(stream, log)

/*if (!module.parent) {

  assert.strictEqual(log('test'), 'test')
  assert.deepEqual(log('test', 42), [ 'test', 42 ])

}*/
