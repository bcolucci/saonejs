
import { Client } from 'elasticsearch'
import { searchStream } from '../../../utils/elasticsearch'
import createStream from '../stream'

export default (
  clientOpts,
  searchOpts = { index, type, body: { query: { match_all: {} } } },
  streamOpts = { size: 500, scroll: '30s' }) => {

  const stream = createStream()
  const client = new Client(clientOpts)

  const search = searchStream(client, stream, streamOpts)

  return {
    stream: stream,
    listen: () => search(searchOpts)
  }
}
