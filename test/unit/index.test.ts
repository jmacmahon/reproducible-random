import { expect } from 'chai'
import sinon = require('sinon')
import { createRandomContext, CreateRandom, ConsoleLog } from '../../src'

describe('the thing', () => {
  let createRandom: CreateRandom
  let fakeConsoleLog: ConsoleLog

  beforeEach(() => {
    fakeConsoleLog = sinon.spy()
    createRandom = createRandomContext(fakeConsoleLog)
  })

  describe('on first call', () => {
    it('should generate and output a master seed', () => {
      const random = createRandom()
      expect(random.masterSeed).to.not.equal(undefined)
      expect(fakeConsoleLog).to.have.been.calledWith(`RANDOM_SEED=${random.masterSeed}`)
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
      const random1 = createRandom()
      const random2 = createRandom()
      expect(random1.masterSeed).to.equal(random2.masterSeed)
    })
  })
})
