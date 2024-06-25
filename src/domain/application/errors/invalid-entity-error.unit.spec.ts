import { InvalidEntityError } from './invalid-entity-error'

describe('InvalidEntityError', () => {
  it('should be able to create a new InvalidEntityError', () => {
    const error = new InvalidEntityError('USER')

    expect(error.message).toBe('This entity have invalid properties ' + 'USER')
  })
})
