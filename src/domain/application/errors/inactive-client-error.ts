import { ServiceError } from '@/@shared/errors/service-error'

export class InactiveClientError extends Error implements ServiceError {
  constructor() {
    super('Client is inactive')
  }
}
