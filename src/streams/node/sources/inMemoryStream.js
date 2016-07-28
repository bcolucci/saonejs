
import createStream from '../stream'

/**
 * TODO We probably don't need this, we could use a generator
 */
export default (data: Array) => {

  const source = createStream()
  const targetStream = createStream()

  source.pipe(targetStream)

  const listen = (opts = { timeout: Number = 100}) => {

    const next = () => {
      const item = data.shift()
      if (item === null)
        clearInterval(mx)
      targetStream.push(item)
    }

    const mx = setInterval(next, opts.timeout)

  }

  return { stream: targetStream, listen }
}
