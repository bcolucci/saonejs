
import wrap from '../utils/wrap'

const between = (write: Function, opts) => {

  let buffer = []

  return {
    data: (data) => {

      if(opts.test(data)) {
        if(buffer.length)
          write(buffer)
        return buffer = [data]
      }

      if (buffer.length)
        buffer = buffer.concat(data)
    }
  }
}

export default (opts = { test: Function }): Function => wrap(between, opts)