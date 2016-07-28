
import wrap from '../utils/wrap'

const map = (write: Function, opts) => {
  return {
    data: (data) => write(opts.transform(data))
  }
}

export default (opts = { transform: Function }): Function => wrap(map, opts)
