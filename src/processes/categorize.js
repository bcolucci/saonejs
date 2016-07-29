import createStream from '../streams/stream'

export default (opts = { field }): Function => {
  const output = createStream();
  let streams = {};

  return (stream) => {
    stream.on('data', (data) => {
      const fieldValue = data[opts.field];
      let existingStream = streams[fieldValue];

      if(!existingStream) {
        existingStream = createStream();
        existingStream.category = fieldValue;

        streams = Object.assign({}, streams, {
          [fieldValue]: existingStream
        });

        output.write(streams);
      }

      existingStream.write(data);
    })

    return output;
  }
}
