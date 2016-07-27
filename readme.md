
# River.js

**in active development**

Look at [src/test.js](https://github.com/wuha-io/river/blob/master/src/test.js)
```javascript
import { sample, fillFromGenerator } from './utils/arrays'
import { continus } from './utils/generators'
import inMemoryStream from './streams/sources/inMemoryStream'
import log from './processes/log'
import spread from './processes/spread'

const genders = [ 'male', 'female' ]
const randomGender = (): string => sample(genders)
const randomUser = () => Object.assign({}, { sex: randomGender() })

const users = fillFromGenerator({
  generator: continus(randomUser),
  nbItems: 1000
})

const { stream, start } = inMemoryStream(users)
const { males, females } = spread({
  field: 'sex',
  map: { males: 'male', females: 'female' }
})(stream)

log()(females)

start()
```
