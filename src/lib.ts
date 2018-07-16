import { createRandomContext, generateSeedContext, CreateRandom } from './reproducible-random'

const createRandom: CreateRandom = createRandomContext(generateSeedContext())
export default createRandom
