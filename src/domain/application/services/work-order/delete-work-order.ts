import { Either, right } from '@/@shared/either'
import { WorkOrderRepository } from '../../repositories/work-order-repository'

type DeleteWorkOrderServiceRequest = {
  id: string
}

type DeleteWorkOrderServiceResponse = Either<void, void>

export class DeleteWorkOrderService {
  constructor(private workOrderRepository: WorkOrderRepository) {}

  async execute({
    id,
  }: DeleteWorkOrderServiceRequest): Promise<DeleteWorkOrderServiceResponse> {
    return right(await this.workOrderRepository.deleteWorkOrder(id))
  }
}
