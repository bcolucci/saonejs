
import createStream from '../stream'

export default (opts = { generator: Function, customName: String }) => {

  const { generator, customName } = opts

  const stream = createStream({ processName: 'generator', customName })

  const iterator = generator()

  let tx

  const write = () => {
    const cursor = iterator.next()
    if (cursor.done) {
      clearInterval(tx)
      return stream.emit('end')
    }
    stream.push(cursor.value)
  }

  const listen = () => tx = setInterval(write, 50)

  return { stream, listen }
}
