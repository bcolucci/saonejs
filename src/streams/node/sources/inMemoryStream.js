
import readable from '../readable'
import stream from '../stream'

/**
 * TODO We probably don't need this, we could use a generator
 */
export default (data: Array) => {

  const source = readable()
  const targetStream = stream()

  source.pipe(targetStream)

  const start = (opts = { timeout: Number = 100}) => {

    const next = () => {
      const item = data.shift()
      if (item === null)
        clearInterval(mx)
      targetStream.push(item)
    }

    const mx = setInterval(next, opts.timeout)

  }

  return { stream: targetStream, start }
}
