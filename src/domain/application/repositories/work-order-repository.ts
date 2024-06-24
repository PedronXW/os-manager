import { WorkOrder } from '@/domain/enterprise/entities/work-order/work-order'

export type WorkOrderQueryResponse = {
  workOrders: WorkOrder[]
  workOrdersQueryCount: number
}

export abstract class WorkOrderRepository {
  abstract createWorkOrder(workOrder: WorkOrder): Promise<WorkOrder>
  abstract updateWorkOrder(
    id: string,
    newWorkOrder: WorkOrder,
  ): Promise<WorkOrder>

  abstract deleteWorkOrder(id: string): Promise<void>
  abstract getAllWorkOrders(
    page: number,
    limit: number,
  ): Promise<WorkOrderQueryResponse>

  abstract getWorkOrderById(id: string): Promise<WorkOrder | undefined>
}
