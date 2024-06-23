import { InactiveUserError } from './inactive-user-error'

describe('InactiveUserError', () => {
  it('should be able to create a new InactiveUserError', () => {
    const error = new InactiveUserError()

    expect(error.message).toBe('User is inactive')
  })
})
