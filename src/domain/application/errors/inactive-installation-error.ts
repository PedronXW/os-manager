import { ServiceError } from '@/@shared/errors/service-error'

export class InactiveInstallationError extends Error implements ServiceError {
  constructor() {
    super('Installation is inactive')
  }
}
