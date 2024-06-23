import { UserAlreadyExistsError } from './user-already-exists-error'

describe('UserAlreadyExistsError', () => {
  it('should be able to create a new UserAlreadyExistsError', () => {
    const error = new UserAlreadyExistsError()

    expect(error.message).toBe('User already exists')
  })
})
