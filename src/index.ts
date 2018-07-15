import * as Random from 'random-js'

type Seed = number
export type ConsoleLog = (message?: any, ...optionalParams: any[]) => void
export type CreateRandom = (providedMasterSeed?: Seed) => Random
export type SeedGenerator = () => Seed

export function createRandomContext (consoleLog: ConsoleLog = console.log, seedGenerator: SeedGenerator = generateSeed): CreateRandom {
  let masterSeed: Seed | undefined
  function createRandom (providedMasterSeed?: Seed) {
    if (masterSeed === undefined) {
      if (providedMasterSeed !== undefined) {
        masterSeed = providedMasterSeed
      } else {
        masterSeed = seedGenerator()
      }
      consoleLog(`RANDOM_SEED=${masterSeed}`)
    }
    return Random()
  }
  return createRandom
}

export const generateSeed: SeedGenerator = () => {
  return Random().integer(-(2 ** 53), 2 ** 53)
}
