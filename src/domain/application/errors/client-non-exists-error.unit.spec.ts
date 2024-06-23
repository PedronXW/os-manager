import { ClientNonExistsError } from './client-non-exists-error'

describe('ClientNonExistError', () => {
  it('should be able to create a new ClientNonExistsError', () => {
    const error = new ClientNonExistsError()

    expect(error.message).toBe('Client non exists error')
  })
})
