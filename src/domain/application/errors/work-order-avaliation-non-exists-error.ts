import { ServiceError } from '@/@shared/errors/service-error'

export class WorkOrderAvaliationNonExistsError
  extends Error
  implements ServiceError
{
  constructor() {
    super(`Work Order Avaliation non exists`)
  }
}
