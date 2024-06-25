import { Either, left, right } from '@/@shared/either'
import { WorkOrderAvaliation } from '@/domain/enterprise/entities/work-order-avaliation/work-order-avaliation'
import { WorkOrderAvaliationNonExistsError } from '../../errors/work-order-avaliation-non-exists-error'
import { WorkOrderAvaliationRepository } from '../../repositories/work-order-avaliation-repository'

type GetWorkOrderAvaliationByIdServiceRequest = {
  id: string
}

type GetWorkOrderAvaliationByIdServiceResponse = Either<
  WorkOrderAvaliationNonExistsError,
  WorkOrderAvaliation | undefined
>

export class GetWorkOrderAvaliationByIdService {
  constructor(
    private workOrderAvaliationRepository: WorkOrderAvaliationRepository,
  ) {}

  async execute({
    id,
  }: GetWorkOrderAvaliationByIdServiceRequest): Promise<GetWorkOrderAvaliationByIdServiceResponse> {
    const workOrderAvaliation =
      await this.workOrderAvaliationRepository.getWorkOrderAvaliationById(id)

    if (!workOrderAvaliation) {
      return left(new WorkOrderAvaliationNonExistsError())
    }

    return right(workOrderAvaliation)
  }
}
