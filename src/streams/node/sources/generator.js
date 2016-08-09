
import createStream from '../stream'

export default (generator: Function) => {

  const stream = createStream()
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
