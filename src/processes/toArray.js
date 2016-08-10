
import wrap from '../utils/wrap'

const toArray = (write: Function, opts) => {
  let buffer = []
  const data = (() => {
    if (opts.chunkSize === -1)
      return data => buffer = buffer.concat(data)
    return data => {
      buffer = buffer.concat(data)
      if (buffer.length === opts.chunkSize) {
        write(buffer)
        buffer = []
      }
    }
  })()
  return { data, end: () => write(buffer) }
}

export default (opts = { chunkSize: -1 }): Function => wrap(toArray, opts)
