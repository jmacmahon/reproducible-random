import { expect } from 'chai'
import sinon = require('sinon')
import { createRandomContext, CreateRandom, ConsoleLog, SeedGenerator } from '../../src/lib'

describe('seeding', () => {
  let createRandom: CreateRandom
  let fakeConsoleLog: ConsoleLog
  let fakeSeedGenerator: SeedGenerator

  beforeEach(() => {
    fakeConsoleLog = sinon.spy()
    fakeSeedGenerator = sinon.stub().returns(12345)
    createRandom = createRandomContext(fakeConsoleLog, fakeSeedGenerator)
  })

  describe('on first call', () => {
    it('should generate and output a seed', () => {
      createRandom()
      expect(fakeConsoleLog).to.have.been.calledWith(`RANDOM_SEED=12345`)
    })

    it('should handle a provided seed value', () => {
      createRandom(25)
      expect(fakeConsoleLog).to.have.been.calledWith('RANDOM_SEED=25')
    })
  })

  describe('on subsequent calls', () => {
    it('should not output', () => {
      createRandom()
      createRandom()
      expect(fakeConsoleLog).to.have.callCount(1)
    })
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
