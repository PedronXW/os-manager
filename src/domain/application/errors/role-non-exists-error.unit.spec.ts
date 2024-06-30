import { RoleNonExistsError } from './role-non-exists-error'

describe('RoleNonExistError', () => {
  it('should be able to create a new RoleNonExistsError', () => {
    const error = new RoleNonExistsError()

    expect(error.message).toBe('Role non exists error')
  })
})
