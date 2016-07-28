
import { sample, fillFromGenerator } from '../../src/utils/arrays'
import { continus } from '../../src/utils/generators'
import inMemoryStream from '../../src/streams/sources/inMemoryStream'

const genders = [ 'male', 'female' ]
const randomGender = (): string => sample(genders)
const randomAge = (): number => Math.floor(Math.random() * 30)
const randomUser = () => Object.assign({}, {
  sex: randomGender(),
  age: randomAge(),
  pokemonHunter: sample([ true, false ])
})

const users = fillFromGenerator({ generator: continus(randomUser), nbItems: 5000 })

const source = inMemoryStream(users)

export default source
