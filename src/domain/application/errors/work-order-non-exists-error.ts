import { ServiceError } from '@/@shared/errors/service-error'

export class WorkOrderNonExistsError extends Error implements ServiceError {
  constructor() {
    super(`Work Order non exists`)
  }
}
