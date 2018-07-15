import { expect } from 'chai'
import * as sinon from 'sinon'
import { createRandomContext, CreateRandom, ConsoleLog, SeedGenerator, ProcessEnv, generateSeedContext } from '../../src/reproducible-random'

describe('state tracking', () => {
  let createRandom: CreateRandom
  let fakeConsoleLog: ConsoleLog
  let fakeSeedGenerator: SeedGenerator

  beforeEach(() => {
    fakeConsoleLog = sinon.spy()
    fakeSeedGenerator = sinon.stub().returns(12345)
    createRandom = createRandomContext(fakeSeedGenerator, fakeConsoleLog)
  })

  it('should generate and output a seed on first call', () => {
    createRandom()
    expect(fakeConsoleLog).to.have.been.calledWith(`RANDOM_SEED=12345`)
  })

  it('should not output on subsequent calls', () => {
    createRandom()
    createRandom()
    expect(fakeConsoleLog).to.have.callCount(1)
  })
})

describe('returned random generator', () => {
  let createRandom: CreateRandom

  beforeEach(() => {
    createRandom = createRandomContext()
  })

  it('should return a random generator object', () => {
    const random = createRandom()
    expect(random.integer(-100, 100)).to.be.within(-100, 99)
    expect(random.bool()).to.be.oneOf([true, false])
  })

  it('should return the same random generator object for subsequent calls', () => {
    const random1 = createRandom()
    const random2 = createRandom()
    expect(random1).to.equal(random2)
  })
})

describe('generating a seed', () => {
  it('should use the default seed generator if no seed is passed as an environment variable', () => {
    const expectedSeed = 12345
    const fakeSeedGenerator = sinon.stub().returns(expectedSeed)
    const actualSeed = generateSeedContext({}, fakeSeedGenerator)()
    expect(fakeSeedGenerator).to.have.callCount(1)
    expect(actualSeed).to.equal(expectedSeed)
  })

  describe('with RANDOM_SEED environment variable set', () => {
    it('should parse a valid seed', () => {
      const fakeSeedGenerator = sinon.stub()
      const expectedSeed = 12345
      const actualSeed = generateSeedContext({ 'RANDOM_SEED': `${expectedSeed}` }, fakeSeedGenerator)()
      expect(fakeSeedGenerator).to.have.callCount(0)
      expect(actualSeed).to.equal(expectedSeed)
    })

    it('should reject an invalid seed', () => {
      const expectedSeed = 12345
      const fakeSeedGenerator = sinon.stub().returns(expectedSeed)
      const actualSeed = generateSeedContext({ 'RANDOM_SEED': 'junkdatahere' }, fakeSeedGenerator)()
      expect(fakeSeedGenerator).to.have.callCount(1)
      expect(actualSeed).to.equal(expectedSeed)
    })
  })
})
