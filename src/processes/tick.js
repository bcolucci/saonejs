
import { head, tail } from 'ramda'
import wrap from '../utils/wrap'

const tick = (write: Function, opts) => {

  let buffer = []

  const writeNext = () => {
    if (!buffer.length)
      return
    const first = head(buffer)
    buffer = tail(buffer)
    write(first)
  }

  const interval = setInterval(writeNext, opts.speed)

  return {
    data: (data) => buffer = buffer.concat(data),
    end: () => clearInterval(interval)
  }
}

export default (opts = { speed: 0 }): Function => wrap(tick, opts)
