
import { Transform } from 'stream'
import { mathRandom as mathRandomGen } from './generators'
import createStream from '../streams/stream'

export const streamGenerator = (generator: Function, opts = {
  autostart: Boolean = true
  , nextTick: Function = process.nextTick
}): Transform => {

  const stream = createStream()

  stream.start = function () {
    let iterator = generator()
    const flush = () => {
      const cursor = iterator.next()
      if (cursor.done)
        return this.emit('end')
      this.emit('data', cursor.value)
    }
    const ctx = setInterval(flush, 0)
    this.on('end', () => clearInterval(ctx))
  }

  if (opts.autostart)
    stream.start()

  return stream
}
