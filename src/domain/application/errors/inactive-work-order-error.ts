import { ServiceError } from '@/@shared/errors/service-error'

export class InactiveWorkOrderError extends Error implements ServiceError {
  constructor() {
    super('Work order is inactive')
  }
}
