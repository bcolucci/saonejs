
import flow from '../src/flow'
import log from '../src/processes/log'
import filter from '../src/processes/filter'
import map from '../src/processes/map'
import buffer from '../src/processes/buffer'
import count from '../src/processes/count'
import cast from '../src/processes/cast'

import source from './fixtures/users'

const bufferedUsers = buffer({ chunkSize: 10 })(source.stream)

//log()(bufferedUsers)

const males = filter({ test: (user) => user.sex === 'male' })(bufferedUsers)
const females = filter({ test: (user) => user.sex === 'female' })(bufferedUsers)

const numberOfUsers = count()(bufferedUsers)

const logYoungFemales = flow(
  filter({ test: u => u.age < 21 })
  , map({ transform: u => Object.assign({}, u, { isVeryYoung: u.age <= 10 }) })
  , log())(females)

log()(males)

const logOfNumberOfUsers = log()(numberOfUsers)

//log()(logOfNumberOfUsers)

const castedAges = flow(
  map({ transform: u => u.age }),
  cast({ type: String })
)
//castedAges(stream).on('data', (age) => console.log(typeof age, age))

source.listen()
