
import emptyStream from './emptyStream'
import transformStream from '../transformStream'

export default (data: Array) => {

  const readable = emptyStream()
  const stream = transformStream()

  readable.pipe(stream)

  const start = () => {

    const next = () => {
      const item = data.shift()
      if (item === null)
        clearInterval(mx)
      readable.push(item)
    }

    const mx = setInterval(next, 500)
    
  }

  return { stream, start }
}
