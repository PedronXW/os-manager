import { Either, left, right } from '@/@shared/either'
import { WorkOrderResult } from '@/domain/enterprise/entities/work-order-result/work-order-result'
import { WorkOrderResultNonExistsError } from '../../errors/work-order-result-non-exists-error'
import { WorkOrderResultRepository } from '../../repositories/work-order-result-repository'

type UpdateWorkOrderResultServiceRequest = {
  id: string
  description?: string
  price?: number
}

type UpdateWorkOrderResultServiceResponse = Either<
  WorkOrderResultNonExistsError,
  WorkOrderResult
>

export class UpdateWorkOrderResultService {
  constructor(private workOrderResultRepository: WorkOrderResultRepository) {}

  async execute({
    id,
    description,
    price,
  }: UpdateWorkOrderResultServiceRequest): Promise<UpdateWorkOrderResultServiceResponse> {
    const workOrderResultExists =
      await this.workOrderResultRepository.getWorkOrderResultById(id)

    if (!workOrderResultExists) {
      return left(new WorkOrderResultNonExistsError())
    }

    workOrderResultExists.description =
      description ?? workOrderResultExists.description
    workOrderResultExists.price = price ?? workOrderResultExists.price

    return right(
      await this.workOrderResultRepository.updateWorkOrderResult(
        id,
        workOrderResultExists,
      ),
    )
  }
}
