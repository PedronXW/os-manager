import { EntityId } from '@/@shared/entities/entity-id'
import { WorkOrderAvaliation } from '@/domain/enterprise/entities/work-order-avaliation/work-order-avaliation'

export function makeWorkOrderAvaliation(
  override: Partial<WorkOrderAvaliation> = {},
  id?: EntityId,
) {
  const workOrderAvaliation = WorkOrderAvaliation.create(
    {
      comment: 'a',
      rating: 10,
      workOrderId: new EntityId('a'),
      createdAt: new Date(),
      ...override,
    },
    id,
  )

  return workOrderAvaliation
}
