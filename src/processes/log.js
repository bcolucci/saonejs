
import pipe from '../pipe'

const log = (data: Object): Object => {
  console.log(data)
  return data
}

export default (params: Object = {}): Function => (stream) => pipe(stream, log)
