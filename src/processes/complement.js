
import { keys, difference, pick, union } from 'ramda'
import wrap from '../utils/wrap'

const each = (write: Function, opts: {}) => {
  let seenKeys = []
  return {
    data: (data) => {
      const currentKeys = keys(data)
      const diff = difference(currentKeys, seenKeys)
      write(pick(diff, data))
      seenKeys = union(seenKeys, currentKeys)
    }
  }
}

export default (opts = {}): Function => wrap(each, opts)
