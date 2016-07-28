
import { define, cast as castTo } from 'casting'
import wrap from '../utils/wrap'

const cast = (write: Function, opts) => {
  const { type, definition } = opts
  if (definition)
    define(type, definition)
  return {
    data: (data) => write(castTo(type, data))
  }
}

export default (opts = { type, definition }): Function => wrap(cast, opts)
