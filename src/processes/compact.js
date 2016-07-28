
import { head, last, tail } from 'ramda'
import wrap from '../utils/wrap'

const compact = (write: Function, opts) => {
  const { equals, chunkSize } = opts
  const buffer = []
  const compactChunk = () => {
    const next = (arr: Array, compacted: Array = []) => {
      if (!arr.length)
        return compacted
      const x = head(arr)
      if (!equals(x, last(compacted)))
        compacted.push(x)
      return next(tail(arr))
    }
    return next(buffer.splice(0, buffer.length))
  }
  return {
    data: (data) => {
      buffer.push(data)
      if (buffer.length === chunkSize)
        write(compactChunk())
    }
  }
}

export default (opts = { equals: Function, chunkSize: Number = 10 }): Function => wrap(compact, opts)
