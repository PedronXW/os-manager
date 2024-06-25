import { Either, left, right } from '@/@shared/either'
import { WorkOrderResult } from '@/domain/enterprise/entities/work-order-result/work-order-result'
import { WorkOrderResultNonExistsError } from '../../errors/work-order-result-non-exists-error'
import { WorkOrderResultRepository } from '../../repositories/work-order-result-repository'

type GetWorkOrderResultByIdServiceRequest = {
  id: string
}

type GetWorkOrderResultByIdServiceResponse = Either<
  WorkOrderResultNonExistsError,
  WorkOrderResult | undefined
>

export class GetWorkOrderResultByIdService {
  constructor(private workOrderResultRepository: WorkOrderResultRepository) {}

  async execute({
    id,
  }: GetWorkOrderResultByIdServiceRequest): Promise<GetWorkOrderResultByIdServiceResponse> {
    const workOrderResult =
      await this.workOrderResultRepository.getWorkOrderResultById(id)

    if (!workOrderResult) {
      return left(new WorkOrderResultNonExistsError())
    }

    return right(workOrderResult)
  }
}
