import { DomainEvents } from '@/@shared/events/event-dispatcher'
import {
    WorkOrderQueryResponse,
    WorkOrderRepository,
} from '@/domain/application/repositories/work-order-repository'
import { WorkOrder } from '@/domain/enterprise/entities/work-order/work-order'

export class InMemoryWorkOrderRepository implements WorkOrderRepository {
  public workOrders: WorkOrder[] = []

  async createWorkOrder(workOrder: WorkOrder): Promise<WorkOrder> {
    this.workOrders.push(workOrder)

    DomainEvents.markEntityForDispatch(workOrder)

    DomainEvents.dispatchEventsForEntity(workOrder.id)

    return workOrder
  }

  async updateWorkOrder(
    id: string,
    newWorkOrder: WorkOrder,
  ): Promise<WorkOrder> {
    const workOrderIndex = this.workOrders.findIndex(
      (workOrder) => workOrder.id.getValue() === id,
    )

    this.workOrders[workOrderIndex] = newWorkOrder

    return newWorkOrder
  }

  async deleteWorkOrder(id: string): Promise<void> {
    this.workOrders = this.workOrders.filter(
      (workOrder) => workOrder.id.getValue() !== id,
    )
  }

  async getAllWorkOrders(
    page: number,
    limit: number,
  ): Promise<WorkOrderQueryResponse> {
    const startIndex = (page - 1) * limit

    const endIndex = page * limit

    return {
      workOrders: this.workOrders.slice(startIndex, endIndex),
      workOrdersQueryCount: this.workOrders.length,
    }
  }

  async getWorkOrderById(id: string): Promise<WorkOrder | undefined> {
    return this.workOrders.find((workOrder) => workOrder.id.getValue() === id)
  }
}
