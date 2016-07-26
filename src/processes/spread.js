
import transformStream from '../streams/transformStream'

export default (params: Object = { field: string, map: Object }) => {

  const { field, map } = params

  // streams [ males => Stream ]
  // fields [ male => males ]

  const [ streamNameToStreamMap, fieldValueToStreamNameMap ] = Object.keys(map)
    .reduce(([ streamNameToStreamMap, fieldValueToStreamNameMap ], streamName) => {

      const fieldValue = map[streamName]

      streamNameToStreamMap[streamName] = transformStream();
      fieldValueToStreamNameMap[fieldValue] = streamName;

      return [ streamNameToStreamMap, fieldValueToStreamNameMap ]

    }, [ {}, {} ])

  return (stream) => {

    stream.on('data', (data) => {

      const fieldValue = data[field]
      const targetStreamName = fieldValueToStreamNameMap[fieldValue]
      const targetStream = streamNameToStreamMap[targetStreamName]

      targetStream.push(data)

    })

    return streamNameToStreamMap
  }
}
