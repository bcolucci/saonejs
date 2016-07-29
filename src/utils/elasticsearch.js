
import { Stream } from 'stream'

export const searchStream = (client, targetStream: Stream, streamOpts = {}): Function => {

  let { size, scroll } = streamOpts

  //TODO extract
  const onError = console.error.bind(console)

  const handleResponse = (res, countBefore) => {

    let total = res.hits.total
    let countAfter = countBefore + res.hits.hits.length

    res.hits.hits.forEach(hit => targetStream.write(hit._source))

    console.log('Events so far:', countAfter)

    if (total !== countAfter)
      client.scroll({ scrollId: res._scroll_id, scroll: scroll })
        .then((res) => handleResponse(res, countAfter))
        .catch(onError)
  }

  return (searchOpts) => {
    client.search(Object.assign({ size }, searchOpts, { scroll }))
      .then((res) => handleResponse(res, 0))
      .catch(onError)
    return targetStream
  }
}
