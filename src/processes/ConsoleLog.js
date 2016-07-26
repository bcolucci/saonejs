
import { pipe } from '../streams'

const log = (data) => {
  console.log(data)
  return data
}

export const ConsoleLog = (params) => {
  return (stream) => pipe(stream, (data) => log(data))
}
