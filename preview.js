
import { sample, fillFromGenerator } from './src/utils/arrays'
import { continus } from './src/utils/generators'
import inMemoryStream from './src/streams/sources/inMemoryStream'
import flow from './src/flow'
import log from './src/processes/log'
import filter from './src/processes/filter'
import map from './src/processes/map'
import buffer from './src/processes/buffer'
import count from './src/processes/count'
import spread from './src/processes/spread'
import cast from './src/processes/cast'

// -----------------------------------------------------------------------------

const genders = [ 'male', 'female' ]
const randomGender = (): string => sample(genders)
const randomAge = (): number => Math.floor(Math.random() * 99)
const randomUser = () => Object.assign({}, {
  sex: randomGender(),
  age: randomAge()
})

const users = fillFromGenerator({ generator: continus(randomUser), nbItems: 5000 })

// -----------------------------------------------------------------------------

const { start, stream } = inMemoryStream(users)
const bufferedUsers = buffer({ chunkSize: 10 })(stream)

//log()(bufferedUsers)

const males = filter({ test: (user) => user.sex === 'male' })(bufferedUsers)
const females = filter({ test: (user) => user.sex === 'female' })(bufferedUsers)

const numberOfUsers = count()(bufferedUsers)

const logYoungFemales = flow(
  filter({ test: u => u.age < 21 })
  , map({ transform: u => Object.assign({}, u, { isVeryYoung: u.age <= 10 }) })
  , log())(females)

//log()(males)

const logOfNumberOfUsers = log()(numberOfUsers)

//log()(logOfNumberOfUsers)

const castedAges = flow(
  map({ transform: u => u.age }),
  cast({ type: String })
)
//castedAges(stream).on('data', (age) => console.log(typeof age, age))

start()
