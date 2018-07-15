import { createRandomContext, generateSeedContext, CreateRandom } from './reproducible-random'

export default function createRandom (): CreateRandom {
  return createRandomContext(generateSeedContext())
}
