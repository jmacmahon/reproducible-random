import { createRandomContext, generateSeedContext, CreateRandom } from './reproducible-random'

export const createRandom: CreateRandom = createRandomContext(generateSeedContext())
export const random: Random = createRandom()
export default createRandom
