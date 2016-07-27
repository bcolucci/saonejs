
import transformStream from '../streams/transformStream'

/**
 * Filter a stream
 */
export default (opts = { test: Function }): Function => {

  const targetStream = transformStream()

  const route = (data) => {
    if (opts.test(data))
      targetStream.push(data)
  }

  return (stream) => {
    stream.on('data', route)
    return targetStream
  }
}
