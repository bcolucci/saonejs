
import stream from '../streams/stream'

/**
 * Spread a stream based on values
 * Uses a map to route data
 */
export default (opts = { field: string, map }): Function => {

  const [ streamNameToStreamMap, fieldValueToStreamNameMap ] = Object.keys(opts.map)
    .reduce(([ streamNameToStreamMap, fieldValueToStreamNameMap ], streamName) => {

      const fieldValue = opts.map[streamName]
      streamNameToStreamMap[streamName] = stream()
      fieldValueToStreamNameMap[fieldValue] = streamName

      return [ streamNameToStreamMap, fieldValueToStreamNameMap ]

    }, [ {}, {} ])

  const route = (data) => {
    const fieldValue = data[opts.field]
    const targetStreamName = fieldValueToStreamNameMap[fieldValue]
    const targetStream = streamNameToStreamMap[targetStreamName]
    targetStream.push(data)
  }

  return (stream) => {
    stream.on('data', route)
    return streamNameToStreamMap
  }
}
