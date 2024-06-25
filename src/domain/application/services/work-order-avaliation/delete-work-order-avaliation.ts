import { Either, right } from '@/@shared/either'
import { WorkOrderAvaliationRepository } from '../../repositories/work-order-avaliation-repository'

type DeleteWorkOrderAvaliationServiceRequest = {
  id: string
}

type DeleteWorkOrderAvaliationServiceResponse = Either<void, void>

export class DeleteWorkOrderAvaliationService {
  constructor(
    private workOrderAvaliationRepository: WorkOrderAvaliationRepository,
  ) {}

  async execute({
    id,
  }: DeleteWorkOrderAvaliationServiceRequest): Promise<DeleteWorkOrderAvaliationServiceResponse> {
    return right(
      await this.workOrderAvaliationRepository.deleteWorkOrderAvaliation(id),
    )
  }
}
