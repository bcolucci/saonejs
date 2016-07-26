import { pipe } from '../streams';
import NodeTransform from '../nodejs/NodeTransform';

const createStream = function() {
  return new NodeTransform({});
};

export const Spread = function(params) {
  let field = params.field;
  let map = params.map;

  // streams [ males => Stream ]
  // fields [ male => males ]
  
  let [ streamNameToStreamMap, fieldValueToStreamNameMap ] = Object.keys(map)
    .reduce(([ streamNameToStreamMap, fieldValueToStreamNameMap ], streamName) => {
      let fieldValue = map[streamName];
      streamNameToStreamMap[streamName] = createStream();
      fieldValueToStreamNameMap[fieldValue] = streamName;

      return [ streamNameToStreamMap, fieldValueToStreamNameMap ];

    }, [{}, {}]);

  return (stream) => {
    
    stream.on('data', (data) => {
      let fieldValue = data[field];
      let targetStreamName = fieldValueToStreamNameMap[fieldValue];
      let targetStream = streamNameToStreamMap[targetStreamName];

      targetStream.push(data);
    });

    return streamNameToStreamMap;
  };
};