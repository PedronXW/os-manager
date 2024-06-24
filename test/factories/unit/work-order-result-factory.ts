import { EntityId } from '@/@shared/entities/entity-id'
import { WorkOrderResult } from '@/domain/enterprise/entities/work-order-result/work-order-result'

export function makeWorkOrderResult(
  override: Partial<WorkOrderResult> = {},
  id?: EntityId,
) {
  const workOrderResult = WorkOrderResult.create(
    {
      description: 'a',
      price: 12,
      createdBy: new EntityId('a'),
      workOrderId: new EntityId('a'),
      createdAt: new Date(),
      ...override,
    },
    id,
  )

  return workOrderResult
}
