import { Either, right } from '@/@shared/either'
import { WorkOrderResultRepository } from '../../repositories/work-order-result-repository'

type DeleteWorkOrderResultServiceRequest = {
  id: string
}

type DeleteWorkOrderResultServiceResponse = Either<void, void>

export class DeleteWorkOrderResultService {
  constructor(private workOrderResultRepository: WorkOrderResultRepository) {}

  async execute({
    id,
  }: DeleteWorkOrderResultServiceRequest): Promise<DeleteWorkOrderResultServiceResponse> {
    return right(await this.workOrderResultRepository.deleteWorkOrderResult(id))
  }
}
