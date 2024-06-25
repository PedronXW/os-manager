import { InactiveInstallationError } from './inactive-installation-error'

describe('InactiveInstallationError', () => {
  it('should be able to create a new InactiveInstallationError', () => {
    const error = new InactiveInstallationError()

    expect(error.message).toBe('Installation is inactive')
  })
})
