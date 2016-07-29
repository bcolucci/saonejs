
import { values as vals } from 'ramda'
import wrap from '../utils/wrap'

const values = (write: Function, opts) => {
  return {
    data: (data) => write(vals(data))
  }
}

export default (opts = {}): Function => wrap(values, opts)
