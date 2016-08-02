
import wrap from '../utils/wrap'
import { contains, append } from 'ramda'

const unique = (write: Function, opts) => {
  let seen = []
  return {
    data: (data) => {
      if(!contains(data, seen)) {
        seen = append(data, seen)
        write(data)
      }
    }
  }
}

export default (opts = {}): Function => wrap(unique, opts)
