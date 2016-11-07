
import { connect } from 'net'
import createStream from '../stream'

export default (opts = { host: String, port: Number, customName: String }) => {

  const { customName } = opts
  const host = opts.host || 'localhost'
  const port = opts.port

  const stream = createStream({ processName: 'socketSource', customName })

  const listen = () => {
    connect({ host, port })
      .on('data', stream.push.bind(stream))
      .on('end', () => stream.emit('end'))
  }

  return { stream, listen }
}
