import { ServiceError } from '@/@shared/errors/service-error'

export class ProductNonExistsError extends Error implements ServiceError {
  constructor() {
    super('Product non exists error')
  }
}
