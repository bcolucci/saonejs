
import { prop } from 'ramda'
import { Stream } from 'stream'

export const searchStream = (client, targetStream: Stream, streamOpts = {}): Function => {

  let { size, max } = streamOpts
  let currentRequest = null
  let closing = false

  const sourceAttr = prop('_source')
  const scroll = '60m'

  const write = targetStream.write.bind(targetStream)
  const onError = (err) => {
    if(!closing) {
      targetStream.emit('error', err)
    }
  }

  const handleResponse = (res, countBefore) => {

    let total = res.hits.total
    let countAfter = countBefore + res.hits.hits.length

    res.hits.hits
      .map(sourceAttr)
      .forEach(write)

    console.log('Events so far:', countAfter)

    if (total !== countAfter && (!max || max > countAfter)) {
      client.scroll({ scrollId: res._scroll_id, scroll: scroll })
      .then((res) => handleResponse(res, countAfter))
      .catch(onError)
    } else {
      targetStream.end()
    }
  }

  return (searchOpts) => {
    client.search(Object.assign({ size }, searchOpts, { scroll }))
    .then((res) => handleResponse(res, 0))
    .catch(onError)

    return {
      close: () => {
        console.log('Closing ElasticSearch connection')
        closing = true
        client.close()
        targetStream.end()
      }
    }
  }
}

