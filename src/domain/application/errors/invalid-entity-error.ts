import { ServiceError } from '@/@shared/errors/service-error'

export class InvalidEntityError extends Error implements ServiceError {
  constructor(entityType: string) {
    super('This entity have invalid properties ' + entityType)
  }
}
