import { ServiceError } from '@/@shared/errors/service-error'

export class WorkOrderResultNonExistsError
  extends Error
  implements ServiceError
{
  constructor() {
    super(`Work Order Result non exists`)
  }
}
