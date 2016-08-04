
import { Client } from 'elasticsearch'
import { searchStream } from '../../../utils/elasticsearch'
import createStream from '../stream'

export default (
  clientOpts,
  searchOpts = { index, type, body: { query: { match_all: {} } } },
  streamOpts = { size: 500, scroll: '30s' }) => {

  const stream = createStream()
  const client = new Client(clientOpts)

  //client.ping()
  //  .then(() => console.log('Ping ok'))
  //  .catch(console.error.bind(console))

  const search = searchStream(client, stream, streamOpts)
  
  return {
    stream: stream,
    listen: () => search(searchOpts)
  }
}
