
import sizeOf from 'object-sizeof'
import typeOf from 'typeof'
import { now } from 'microseconds'
import wrap from '../utils/wrap'

const { stringify } = JSON

const pranalyze = (write: Function, opts) => {
  return {
    data: (data) => {
      const size = sizeOf(data)
      const type = typeOf(data)
      write({ size, type, microtime: now(), data: stringify(data) })
    }
  }
}

export default (opts = {}): Function => wrap(pranalyze, opts)
