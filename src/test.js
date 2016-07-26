
import _ from 'lodash'
import streams from './streams'
import processes from './processes'

const inMemoryStream = streams.sources.inMemoryStream

const genders = [ 'male', 'female' ]
const randomGender = (): string => _.sample(genders)

const randomUser = (): Object => {
  return { sex: randomGender() }
}

const generateUsers = (nbUsers: number): Array => {
  const accumulator = (users: Array = []): Array => {
    if (users.length === nbUsers)
      return users
    users.push(randomUser())
    return accumulator(users)
  }
  return accumulator()
}

const users = generateUsers(1000)

const { stream, start } = inMemoryStream(users)

const { males, females } = processes.spread({ field: 'sex',  map: { males: 'male', females: 'female' }})(stream)

processes.log()(females)

start()
