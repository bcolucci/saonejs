
import wrap from '../utils/wrap'

const between = (write: Function, opts) => {

  let buffer = []
  let start = null

  return {
    data: (data) => {
      const test = opts.test(data, start)

      if(test) {
        start = data

        if(buffer.length) {
          write(buffer)
        }

        buffer = [data]
      } else {
        if(start) {
          buffer = buffer.concat(data)
        }
      }
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
