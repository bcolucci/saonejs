
import createStream from '../streams/stream';

export default (opts = { filters }): Function => {
  const keys = Object.keys(opts.map)
  const streams = keys.reduce((streams, key) => Object.assign(streams, { [ key ]: createStream() }), {})
  return (stream) => {
    stream.on('data', (data) => {
      const streamName = keys.find(key => opts.map[key](data))
      streams[streamName].push(data)
    })
    return streams
  }
}
