import { WorkOrderAvaliation } from '@/domain/enterprise/entities/work-order-avaliation/work-order-avaliation'

export type WorkOrderAvaliationQueryResponse = {
  workOrderAvaliations: WorkOrderAvaliation[]
  workOrderAvaliationsQueryCount: number
}

export abstract class WorkOrderAvaliationRepository {
  abstract createWorkOrderAvaliation(
    workOrderAvaliation: WorkOrderAvaliation,
  ): Promise<WorkOrderAvaliation>

  abstract updateWorkOrderAvaliation(
    id: string,
    newWorkOrderAvaliation: WorkOrderAvaliation,
  ): Promise<WorkOrderAvaliation>

  abstract deleteWorkOrderAvaliation(id: string): Promise<void>

  abstract getAllWorkOrderAvaliations(
    page: number,
    limit: number,
  ): Promise<WorkOrderAvaliationQueryResponse>

  abstract getWorkOrderAvaliationById(
    id: string,
  ): Promise<WorkOrderAvaliation | undefined>
}
