import { OnEntityCreated } from '@/domain/application/subscribers/on-entity-created'
import { OnInvalidEntityCreated } from '@/domain/application/subscribers/on-invalid-entity-created'

export enum EntityType {
  USER,
  CLIENT,
  INSTALLATION,
  PRODUCT,
  WORK_ORDER,
  WORK_ORDER_AVALIATION,
  WORK_ORDER_RESULT,
}

export const setupEvents = () => {
  new OnEntityCreated()
  new OnInvalidEntityCreated()
}
