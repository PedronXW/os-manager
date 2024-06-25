import { DomainEvents } from '@/@shared/events/event-dispatcher'
import {
  WorkOrderResultQueryResponse,
  WorkOrderResultRepository,
} from '@/domain/application/repositories/work-order-result-repository'
import { WorkOrderResult } from '@/domain/enterprise/entities/work-order-result/work-order-result'

export class InMemoryWorkOrderResultRepository
  implements WorkOrderResultRepository
{
  public workOrderResults: WorkOrderResult[] = []

  async createWorkOrderResult(
    workOrderResult: WorkOrderResult,
  ): Promise<WorkOrderResult> {
    this.workOrderResults.push(workOrderResult)

    DomainEvents.markEntityForDispatch(workOrderResult)

    DomainEvents.dispatchEventsForEntity(workOrderResult.id)

    return workOrderResult
  }

  async updateWorkOrderResult(
    id: string,
    newWorkOrderResult: WorkOrderResult,
  ): Promise<WorkOrderResult> {
    const workOrderResultIndex = this.workOrderResults.findIndex(
      (workOrderResult) => workOrderResult.id.getValue() === id,
    )

    this.workOrderResults[workOrderResultIndex] = newWorkOrderResult

    return newWorkOrderResult
  }

  async deleteWorkOrderResult(id: string): Promise<void> {
    this.workOrderResults = this.workOrderResults.filter(
      (workOrderResult) => workOrderResult.id.getValue() !== id,
    )
  }

  async getAllWorkOrderResults(
    page: number,
    limit: number,
  ): Promise<WorkOrderResultQueryResponse> {
    const startIndex = (page - 1) * limit

    const endIndex = page * limit

    return {
      workOrderResults: this.workOrderResults.slice(startIndex, endIndex),
      workOrderResultsQueryCount: this.workOrderResults.length,
    }
  }

  async getWorkOrderResultById(
    id: string,
  ): Promise<WorkOrderResult | undefined> {
    return this.workOrderResults.find(
      (workOrderResult) => workOrderResult.id.getValue() === id,
    )
  }
}
