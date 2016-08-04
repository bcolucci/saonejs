
import createStream from '../streams/stream'

//TODO instead of a field, we should have a Function
// because what if I want to categorize strings?
export default (opts = { field }): Function => {

  const targetStream = createStream()

  let streams = {}

  const route = (data) => {

    const fieldValue = data[opts.field]

    let existingStream = streams[fieldValue]
    if (!existingStream) {

      existingStream = createStream()
      existingStream.category = fieldValue

      streams = Object.assign({}, streams, { [fieldValue]: existingStream })

      targetStream.write(streams)
    }

    existingStream.write(data)
  }

  return (stream) => {

    targetStream.on('end', () => Object.keys(streams).forEach(category => streams[category].emit('end')))

    stream
      .on('data', route)
      .on('end', () => targetStream.emit('end'))

    return targetStream
  }
}
