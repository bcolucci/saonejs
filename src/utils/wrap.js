
import createStream from '../streams/stream'

export default (process: Function, opts = {}): Function => {
  const targetStream = createStream()
  return (stream) => {
    const initializedProcess = process(targetStream.push.bind(targetStream), opts)
    Object.keys(initializedProcess).forEach((eventName) => {
      stream.on(eventName, initializedProcess[eventName])
    })
    return targetStream;
  }
}
