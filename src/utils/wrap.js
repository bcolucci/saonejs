
import createStream from '../streams/stream'

const WRITTABLE_EVENTS = [ 'close', 'drain', 'error', 'finish', 'pipe', 'unpipe' ]
const READABLE_EVENTS = [ 'close', 'data', 'end', 'error', 'readable' ]
const EVENTS = [].concat(WRITTABLE_EVENTS, READABLE_EVENTS)

export default (process: Function, opts = {}): Function => {
  return (stream) => {
    
    const targetStream = createStream()
    const initializedProcess = process(targetStream.push.bind(targetStream), opts)

    Object.keys(initializedProcess)
      .filter((n) => EVENTS.includes(n))
      .forEach((n) => stream.on(n, initializedProcess[n]))

    stream.on('end', () => targetStream.emit('end'))

    return targetStream
  }
}
