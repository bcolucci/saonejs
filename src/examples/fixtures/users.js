
import { sample, fillFromGenerator } from '../../utils/arrays'
import { continus } from '../../utils/generators'
import inMemoryStream from '../../streams/sources/inMemoryStream'

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
