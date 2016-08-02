
import wrap from '../utils/wrap'

const head = (write: Function, opts) => {
  let done = false

  return {
    data: (data) => {
      if(done) {
        return
      }

      done = true
      write(data)
    }
  }
}

export default (opts = {}): Function => wrap(head, opts)
