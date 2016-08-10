
import createStream from '../streams/stream'

const events = [ 'close', 'data', 'drain', 'end', 'error', 'finish', 'pipe', 'readable', 'unpipe' ]

export default (process: Function, opts = { customName: String }): Function => {
  return (stream) => {

    const targetStream = createStream({ 
      processName: process.name,
      path: stream.path,
      customName: opts.customName
    })

    // for memory sake
    delete stream.path

    const initializedProcess = process(targetStream.push.bind(targetStream), opts)

    Object.keys(initializedProcess)
      .filter((n) => events.includes(n))
      .forEach((n) => stream.on(n, initializedProcess[n]))

    stream.on('end', () => targetStream.emit('end'))

    return targetStream
  }
}
