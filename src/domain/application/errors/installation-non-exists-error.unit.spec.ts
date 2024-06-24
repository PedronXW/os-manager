import { InstallationNonExistsError } from './installation-non-exists-error'

describe('InstallationNonExistError', () => {
  it('should be able to create a new InstallationNonExistsError', () => {
    const error = new InstallationNonExistsError()

    expect(error.message).toBe('Installation non exists error')
  })
})
