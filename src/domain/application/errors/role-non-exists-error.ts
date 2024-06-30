import { ServiceError } from '@/@shared/errors/service-error'

export class RoleNonExistsError extends Error implements ServiceError {
  constructor() {
    super('Role non exists error')
  }
}
