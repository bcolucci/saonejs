
import wrap from '../utils/wrap'

const between = (write: Function, opts) => {
  let currentPackets = []

  return {
    data: (data) => {

      if(opts.test(data)) {
        if(currentPackets.length) {
          write(currentPackets)
        }

        currentPackets = [data]
      } else {
        if(currentPackets.length) {
          currentPackets = currentPackets.concat(data)  
        } else {
          // console.log('started and not between', data.name)
        }
      }
    }
  }
}

export default (opts = { test }): Function => wrap(between, opts)
