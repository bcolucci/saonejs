
import createStream from '../streams/stream'

//TODO instead of a field, we should have a Function
// because what if I want to categorize strings?
export default (opts = { field, category }): Function => {

  const targetStream = createStream()
  const getCategory = opts.field ? (data) => data[opts.field] : opts.category

  let streams = {}

  const route = (data) => {

    const fieldValue = getCategory(data)

    if(!fieldValue)
      return

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
