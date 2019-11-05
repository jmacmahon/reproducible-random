import { Random, MersenneTwister19937 } from 'random-js'

type Seed = number
export type ConsoleLog = (message?: any, ...optionalParams: any[]) => void
export type CreateRandom = () => Random
export type SeedGenerator = () => Seed
export type ProcessEnv = NodeJS.ProcessEnv

const generateSeed: SeedGenerator = () => {
  return new Random().integer(-(2 ** 53), 2 ** 53)
}

export function createRandomContext (seedGenerator: SeedGenerator = generateSeed, consoleLog: ConsoleLog = console.log): CreateRandom {
  let masterRandom: Random | undefined
  function createRandom () {
    if (masterRandom === undefined) {
      let seed: Seed
      seed = seedGenerator()
      consoleLog(`RANDOM_SEED=${seed}`)
      MersenneTwister19937.seed(seed)
      const engine = MersenneTwister19937.seed(seed)
      masterRandom = new Random(engine)
    }
    return masterRandom
  }
  return createRandom
}

export function generateSeedContext (processEnv: ProcessEnv = process.env, defaultSeedGenerator: SeedGenerator = generateSeed): SeedGenerator {
  const randomSeedEnv = processEnv['RANDOM_SEED']
  if (randomSeedEnv !== undefined) {
    const parsedSeed = parseInt(randomSeedEnv, 10)
    if (!isNaN(parsedSeed)) {
      return () => parsedSeed
    }
  }
  return defaultSeedGenerator
}
