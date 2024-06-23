import { ClientAlreadyExistsError } from './client-already-exists-error'

describe('ClientAlreadyExistError', () => {
  it('should be able to create a new ClientAlreadyExistsError', () => {
    const error = new ClientAlreadyExistsError()

    expect(error.message).toBe('Client already exists error')
  })
})
