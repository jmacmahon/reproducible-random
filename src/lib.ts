import { createRandomContext, generateSeedContext, CreateRandom } from './reproducible-random'
import { Random } from 'random-js'

export const createRandom: CreateRandom = createRandomContext(generateSeedContext())
export const random: Random = createRandom()
export default createRandom
