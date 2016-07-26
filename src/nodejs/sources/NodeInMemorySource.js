
import { Readable } from 'stream'
import NodeTransform from '../NodeTransform'

class NodeReadable extends Readable {

  constructor(params = {}) {
    super(Object.assign({}, params, { objectMode: true }))
  }

  _read() {
  }

}

export const getInMemorySource = () => {

  const data = [];
  for (let i = 0; i < 5000; i++)
    data.push({ sex: Math.random() > .6 ? 'male' : 'female' })

  const readable = new NodeReadable
  const transform = new NodeTransform

  readable.pipe(transform)

  return {
    stream: transform,
    start: () => {
      const next = () => {
        const item = data.shift() || null
        if (item === null)
          clearInterval(mx)
        readable.push(item)
      }
      const mx = setInterval(next, 500)
    }
  }
}
