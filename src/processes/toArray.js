
import wrap from '../utils/wrap'

const toArray = (write: Function, opts) => {
  let buffer = []
  return {
    data: (data) => {
      buffer = buffer.concat(data)
    },
    
    end: () => {
      write(buffer)
      buffer = []
    }
  }
}

export default (opts = {}): Function => wrap(toArray, opts)
