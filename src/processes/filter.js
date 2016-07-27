
import stream from '../streams/stream'

/**
 * Filter a stream
 */
export default (opts = { test: Function }): Function => {

  const targetStream = stream()

  const route = (data) => {
    if (opts.test(data))
      targetStream.push(data)
  }

  return (stream) => {
    stream.on('data', route)
    return targetStream
  }
}
