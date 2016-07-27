
import transformStream from '../streams/transformStream'

/**
 * Map a stream
 */
export default (opts = { transform: Function }): Function => {

  //TODO why???
  const targetStream = transformStream(/*{ transformer: opts.transform }*/)

  return (stream) => {
    stream.on('data', (data) => targetStream.push(opts.transform(data)))
    return targetStream
  }
}
