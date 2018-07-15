import * as Random from 'random-js'

type Seed = number
export type ConsoleLog = (message?: any, ...optionalParams: any[]) => void
export type CreateRandom = (providedMasterSeed?: Seed) => Random
export type SeedGenerator = () => Seed

export const generateSeed: SeedGenerator = () => {
  return Random().integer(-(2 ** 53), 2 ** 53)
}
export function createRandomContext (consoleLog: ConsoleLog = console.log, seedGenerator: SeedGenerator = generateSeed): CreateRandom {
  let masterRandom: Random | undefined
  function createRandom (providedSeed?: Seed) {
    if (masterRandom === undefined) {
      let seed: Seed
      if (providedSeed !== undefined) {
        seed = providedSeed
      } else {
        seed = seedGenerator()
      }
      consoleLog(`RANDOM_SEED=${seed}`)
      const engine = Random.engines.mt19937()
      engine.seed(seed)
      masterRandom = Random(engine)
    }
    return masterRandom
  }
  return createRandom
}
