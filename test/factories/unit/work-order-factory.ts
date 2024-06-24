import { EntityId } from '@/@shared/entities/entity-id'
import { WorkOrder } from '@/domain/enterprise/entities/work-order/work-order'

export function makeWorkOrder(
  override: Partial<WorkOrder> = {},
  id?: EntityId,
) {
  const workOrder = WorkOrder.create(
    {
      description: 'a',
      installation: new EntityId('a'),
      createdBy: new EntityId('a'),
      createdAt: new Date(),
      ...override,
    },
    id,
  )

  return workOrder
}
