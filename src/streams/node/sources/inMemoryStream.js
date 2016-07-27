
import emptyStream from './emptyStream'
import transformStream from '../transformStream'

/**
 * TODO
 */
export default (data: Array) => {

  const readable = emptyStream()
  const stream = transformStream()

  readable.pipe(stream)

  const start = (opts = { timeout: Number = 200}) => {

    const next = () => {
      const item = data.shift()
      if (item === null)
        clearInterval(mx)
      readable.push(item)
    }

    const mx = setInterval(next, opts.timeout)

  }

  return { stream, start }
}
