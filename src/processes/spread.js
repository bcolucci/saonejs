import createStream from '../streams/stream';

export default (opts = { filters }): Function => {
  let keys = Object.keys(opts.map);
  let streams = keys.reduce((streams, key) => Object.assign(streams, { [key]: createStream() }), {});

  return (stream) => {
    stream.on('data', (data) => {
      const streamName = keys.find(key => opts.map[key](data));
      streams[streamName].push(data);
    });

    return streams;
  }
}