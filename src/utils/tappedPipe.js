
import { partial, tap, pipe } from 'ramda'

export default (...fns) => {
  let taps = fns.map(fn => partial(tap, [ fn ]))
  return pipe.apply(null, taps)
}
