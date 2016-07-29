
import createStream from '../streams/stream'

export default (opts = { field }): Function => {

  const targetStream = createStream()

  let streams = {}

  const route = (data) => {

    const fieldValue = data[opts.field]

    let existingStream = streams[fieldValue]
    if(!existingStream) {
      existingStream = createStream()
      existingStream.category = fieldValue

      streams = Object.assign({}, streams, { [fieldValue]: existingStream })

      targetStream.write(streams)
    }

    existingStream.write(data)
  }

  return (stream) => {
    
    stream.on('data', route)

    return targetStream
  }
}
