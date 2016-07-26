
import transformStream from './streams/transformStream'

export default (stream, transformer: Function) =>
  stream.pipe(transformStream({ transformer }))
