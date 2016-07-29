
import { sample, fillFromGenerator } from '../../utils/arrays'
import { continus } from '../../utils/generators'
import inMemoryStream from '../../streams/sources/inMemoryStream'

const eventTypes = [ 'searchBegin', 'searchEnd', 'mouseMove', 'mouseClick' ]
const randomEvent = (): string => sample(eventTypes)

const events = fillFromGenerator({ generator: continus(randomEvent), nbItems: 5000 })

const source = inMemoryStream(events)

export default source
