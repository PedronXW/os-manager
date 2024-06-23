import { WorkOrder } from '@/domain/enterprise/entities/work-order/work-order';

export abstract class WorkOrderRepository {
  abstract createWorkOrder(workOrder: WorkOrder): Promise<WorkOrder>
  abstract updateWorkOrder(
    id: string,
    newWorkOrder: WorkOrder,
  ): Promise<WorkOrder>

  abstract deleteWorkOrder(id: string): Promise<void>
  abstract getAllWorkOrders(page: number, limit: number): Promise<WorkOrder[]>
  abstract getWorkOrderById(id: string): Promise<WorkOrder>
}
