import stream from '../stream'
import elasticsearch from 'elasticsearch';

const asStream = (client, output) => {

  const scrollTimer = '30s';
  const baseStreamConfig = {
    size: 5000
  };

  const handleResponse = (response, countBefore, output) => {
    let total = response.hits.total;
    let countAfter = countBefore + response.hits.hits.length;

    response.hits.hits.forEach(hit => {
      output.write(hit._source);
    });

    console.log('events so far:', countAfter);
    if(total !== countAfter) {
      client.scroll({
        scrollId: response._scroll_id,
        scroll: scrollTimer
      })
      .then((response) => handleResponse(response, countAfter, output))
    } else {
      console.log('Finished query');
    }
  };

  return {
    search: (query) => {
      let params = Object.assign({}, baseStreamConfig, query, {
        scroll: scrollTimer
      });

      client.search(params).then((response) => handleResponse(response, 0, output))

      return output;
    }
  }
};
/**
 * 
var config = require('config');
var lodash = require('lodash');
var elasticsearch = require('elasticsearch');

var defConfig = {
//   apiVersion: '2.2'
//   /*sniffOnStart: true,
//   sniffInterval: 30000,
//   sniffOnConnectionFault: true,
//   maxRetries: 10,
//   requestTimeout: 10000,
//   deadTimeout: 15000,
//   maxSockets: 30,
//   minSockets: 15*/
// };

// var clientConfig = () => config.elasticsearch || {};

// var Client = config => {

//   var _config = JSON.parse(JSON.stringify(lodash.merge(defConfig, config || clientConfig())));
//   //console.log('ES config', _config);

//   var client = new elasticsearch.Client(_config);

//   return client;
// };

// module.exports = Client;


export default (opts = { query: '' }) => {

  const outputStream = stream();

  const client = asStream(new elasticsearch.Client({
    host: "http://nova.wuha.io:9200",
    apiVersion: '2.2'
    /*sniffOnStart: true,
    sniffInterval: 30000,
    sniffOnConnectionFault: true,
    maxRetries: 10,
    requestTimeout: 10000,
    deadTimeout: 15000,
    maxSockets: 30,
    minSockets: 15*/
  }), outputStream);

  const listen = () => {
    client
    .search({
      index: 'wars',
      type: 'extension_event',
      body: {
        query: {
          match_all: {}
        }
      }
    });
  };

  return { stream: outputStream, listen };
}
