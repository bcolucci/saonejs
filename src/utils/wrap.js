import stream from '../streams/stream'

export default (opts, process) => {
  const targetStream = stream();

  return (stream) => {
    let initializedProcess = process(targetStream.push.bind(targetStream), opts);

    Object.keys(initializedProcess).forEach((eventName) => {
      stream.on(eventName, initializedProcess[eventName]);
    });

    return targetStream;
  }
};
