
import { keys as rKeys } from 'ramda'
import wrap from '../utils/wrap'

const keys = (write: Function, opts) => {
  return {
    data: (data) => write(rKeys(data))
  }
}

export default (opts = {}): Function => wrap(keys, opts)
