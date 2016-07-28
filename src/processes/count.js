
import wrap from '../utils/wrap'

const count = (write: Function, opts) => {
  let count = 0
  return {
    data: (data) => {
      count++
      write(count)
    }
  }
}

export default (opts = {}): Function => wrap(count, opts)
