import * as Random from 'random-js'

type Seed = number
export type ConsoleLog = (message?: any, ...optionalParams: any[]) => void
export type CreateRandom = (providedMasterSeed?: Seed) => { masterSeed: Seed }

export function createRandomContext (consoleLog: ConsoleLog = console.log): CreateRandom {
  let masterSeed: Seed
  function createRandom (providedMasterSeed?: Seed) {
    if (masterSeed === undefined) {
      if (providedMasterSeed !== undefined) {
        masterSeed = providedMasterSeed
      } else {
        masterSeed = generateSeed()
      }
      consoleLog(`RANDOM_SEED=${masterSeed}`)
    }
    return {
      masterSeed,
    }
  }
  return createRandom
}

function generateSeed (): Seed {
  return Random().integer(-(2 ** 53), 2 ** 53)
}
