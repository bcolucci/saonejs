
import wrap from '../utils/wrap'
import tappedPipe from '../utils/tappedPipe'

const log = (write: Function, opts) => {
  return {
    data: (data) => tappedPipe(console.log, write)(data)
  }
}

export default (opts = {}): Function => wrap(log, opts)
