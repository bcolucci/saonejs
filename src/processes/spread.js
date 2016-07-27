
import { Stream } from 'stream'
import transformStream from '../streams/transformStream'

/**
 * Spread a stream based on values. Uses a map to route data.
 */
export default (opts = { field: string, map }): Function => {

  const { field, map } = opts

  const [ streamNameToStreamMap, fieldValueToStreamNameMap ] = Object.keys(map)
    .reduce(([ streamNameToStreamMap, fieldValueToStreamNameMap ], streamName) => {

      const fieldValue = map[streamName]

      streamNameToStreamMap[streamName] = transformStream();
      fieldValueToStreamNameMap[fieldValue] = streamName;

      return [ streamNameToStreamMap, fieldValueToStreamNameMap ]

    }, [ {}, {} ])

  const route = (data) => {

    const fieldValue = data[field]
    const targetStreamName = fieldValueToStreamNameMap[fieldValue]
    const targetStream = streamNameToStreamMap[targetStreamName]

    targetStream.push(data)

  }

  return (stream) => {

    stream.on('data', route)

    return streamNameToStreamMap
  }
}
