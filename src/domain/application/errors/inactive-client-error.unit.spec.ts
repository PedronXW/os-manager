import { InactiveClientError } from './inactive-client-error'

describe('InactiveClientError', () => {
  it('should be able to create a new InactiveClientError', () => {
    const error = new InactiveClientError()

    expect(error.message).toBe('Client is inactive')
  })
})
