import { DomainEvents } from '@/@shared/events/event-dispatcher'
import {
    WorkOrderAvaliationQueryResponse,
    WorkOrderAvaliationRepository,
} from '@/domain/application/repositories/work-order-repository'
import { WorkOrderAvaliation } from '@/domain/enterprise/entities/work-order-avaliation/work-order-avaliation'

export class InMemoryWorkOrderAvaliationRepository
  implements WorkOrderAvaliationRepository
{
  public workOrderAvaliations: WorkOrderAvaliation[] = []

  async createWorkOrderAvaliationAvaliation(
    workOrderAvaliationAvaliation: WorkOrderAvaliation,
  ): Promise<WorkOrderAvaliation> {
    this.workOrderAvaliations.push(workOrderAvaliationAvaliation)

    DomainEvents.markEntityForDispatch(workOrderAvaliationAvaliation)

    DomainEvents.dispatchEventsForEntity(workOrderAvaliationAvaliation.id)

    return workOrderAvaliationAvaliation
  }

  async updateWorkOrderAvaliation(
    id: string,
    newWorkOrderAvaliation: WorkOrderAvaliation,
  ): Promise<WorkOrderAvaliation> {
    const workOrderAvaliationIndex = this.workOrderAvaliations.findIndex(
      (workOrderAvaliation) => workOrderAvaliation.id.getValue() === id,
    )

    this.workOrderAvaliations[workOrderAvaliationIndex] = newWorkOrderAvaliation

    return newWorkOrderAvaliation
  }

  async deleteWorkOrderAvaliation(id: string): Promise<void> {
    this.workOrderAvaliations = this.workOrderAvaliations.filter(
      (workOrderAvaliation) => workOrderAvaliation.id.getValue() !== id,
    )
  }

  async getAllWorkOrderAvaliations(
    page: number,
    limit: number,
  ): Promise<WorkOrderAvaliationQueryResponse> {
    const startIndex = (page - 1) * limit

    const endIndex = page * limit

    return {
      workOrderAvaliations: this.workOrderAvaliations.slice(
        startIndex,
        endIndex,
      ),
      workOrderAvaliationsQueryCount: this.workOrderAvaliations.length,
    }
  }

  async getWorkOrderAvaliationById(
    id: string,
  ): Promise<WorkOrderAvaliation | undefined> {
    return this.workOrderAvaliations.find(
      (workOrderAvaliation) => workOrderAvaliation.id.getValue() === id,
    )
  }
}
