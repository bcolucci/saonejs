
import { P, flow, sources, utils } from '../src'

const generator = utils.generators.boundedByIterations(25)(utils.generators.mathRandom)
const { stream, listen } = sources.generator({ generator, customName: 'randomNumbers' })

// log the random number, and log the current current total numbers
const flowStream = flow(
  P.log(), 
  P.count(),
  P.log()
)(stream)

stream.on('end', () => console.log('End of the stream\n', JSON.stringify(flowStream.path, null, 2)))

listen()
