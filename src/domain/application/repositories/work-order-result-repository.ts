import { WorkOrderResult } from '@/domain/enterprise/entities/work-order-result/work-order-result'

export type WorkOrderResultQueryResponse = {
  workOrderResults: WorkOrderResult[]
  workOrderResultsQueryCount: number
}

export abstract class WorkOrderResultRepository {
  abstract createWorkOrderResult(
    workOrderResult: WorkOrderResult,
  ): Promise<WorkOrderResult>

  abstract updateWorkOrderResult(
    id: string,
    newWorkOrderResult: WorkOrderResult,
  ): Promise<WorkOrderResult>

  abstract deleteWorkOrderResult(id: string): Promise<void>
  abstract getAllWorkOrderResults(
    page: number,
    limit: number,
  ): Promise<WorkOrderResultQueryResponse>

  abstract getWorkOrderResultById(
    id: string,
  ): Promise<WorkOrderResult | undefined>
}
