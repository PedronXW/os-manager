import { UserNonExistsError } from './user-non-exists-error'

describe('UserNonExistsError', () => {
  it('should be able to create a new UserAlreadyExistsError', () => {
    const error = new UserNonExistsError()

    expect(error.message).toBe('User non exists')
  })
})
