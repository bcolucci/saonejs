
import { pipe } from '../streams'
import NodeTransform from '../nodejs/NodeTransform'

export const Spread = (params = { field: string, map }) => {

  const { field, map } = params

  // streams [ males => Stream ]
  // fields [ male => males ]

  const [ streamNameToStreamMap, fieldValueToStreamNameMap ] = Object.keys(map)
    .reduce(([ streamNameToStreamMap, fieldValueToStreamNameMap ], streamName) => {

      const fieldValue = map[streamName]

      streamNameToStreamMap[streamName] = new NodeTransform;
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
