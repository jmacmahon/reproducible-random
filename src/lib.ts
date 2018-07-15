import { createRandomContext, generateSeedContext, CreateRandom } from './reproducible-random'

const createRandom: CreateRandom = () => {
  return createRandomContext(generateSeedContext())()
}

export default createRandom
