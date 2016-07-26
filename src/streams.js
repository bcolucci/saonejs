
import emptyStream from './streams/sources/emptyStream'
import inMemoryStream from './streams/sources/inMemoryStream'
import transformStream from './streams/transformStream'

export default {
  sources: {
    emptyStream
    , inMemoryStream
  }
  , transformStream
}
