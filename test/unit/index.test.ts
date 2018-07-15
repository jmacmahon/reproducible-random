import { expect } from 'chai'
import sinon = require('sinon')
import { createRandomContext, CreateRandom, ConsoleLog, SeedGenerator } from '../../src'

describe('createRandom', () => {
  let createRandom: CreateRandom
  let fakeConsoleLog: ConsoleLog
  let fakeSeedGenerator: SeedGenerator

  beforeEach(() => {
    fakeConsoleLog = sinon.spy()
    fakeSeedGenerator = sinon.stub().returns(12345)
    createRandom = createRandomContext(fakeConsoleLog, fakeSeedGenerator)
  })

  describe('on first call', () => {
    it('should generate and output a master seed', () => {
      createRandom()
      expect(fakeConsoleLog).to.have.been.calledWith(`RANDOM_SEED=12345`)
    })

    it('should handle a provided master seed value', () => {
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

    it('should use the same master seed', () => {
      createRandom()
      createRandom()
      expect(fakeSeedGenerator).to.have.callCount(1)
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
})
