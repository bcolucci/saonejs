
import wrap from '../utils/wrap'

const count = (write: Function, opts) => {
  let count = 0
  return {
    data: (data) => {
      count += 1
      write(count)
    }
  }
}

export default (opts = {}): Function => wrap(opts, count)
