
import { head, drop, equals } from 'ramda'
import wrap from '../utils/wrap'

const buffer = (write: Function, opts) => {
  const { chunkSize } = opts
  let buffer = []
  const flush = () => {
    if (!buffer.length)
      return
    write(head(buffer))
    buffer = drop(1, buffer)
    flush()
  }
  return {
    data: (data) => {
      buffer = buffer.concat(data)
      if (equals(buffer.length, chunkSize))
        flush()
    }
  }
}

export default (opts = { chunkSize: Number = 10 }): Function => wrap(buffer, opts)
