import { ServiceError } from '@/@shared/errors/service-error'

export class InvalidClientError extends Error implements ServiceError {
  constructor() {
    super('Client have invalid properties')
  }
}
