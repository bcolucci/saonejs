
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

/**
 * Extract sequences based on a test function.
 * @param {Object} opts Options
 * @param {Function} opts.test The test function
 * @returns {Function} The between fonction to call on a stream
 */
export default (opts = { test: Function }): Function => wrap(between, opts)
