
import createStream from '../stream'

/**
 * TODO We probably don't need this, we could use a generator
 * @param {Array} items The source array from which will came the stream items
 */
export default (items: Array) => {

  const stream = createStream({ processName: 'inMemoryArray' })

  const listen = (opts = { timeout: 10 }) => {

    let index = 0
    const next = () => {
      const item = items[index++] || null
      if (item === null)
        clearInterval(mx)
      stream.push(item)
    }

    const mx = setInterval(next, opts.timeout)

  }

  return { stream, listen }
}
