import { Either, left, right } from '@/@shared/either'
import { WorkOrderAvaliation } from '@/domain/enterprise/entities/work-order-avaliation/work-order-avaliation'
import { WorkOrderAvaliationNonExistsError } from '../../errors/work-order-avaliation-non-exists-error'
import { WorkOrderAvaliationRepository } from '../../repositories/work-order-avaliation-repository'

type UpdateWorkOrderAvaliationServiceRequest = {
  id: string
  comment?: string
  rating?: number
}

type UpdateWorkOrderAvaliationServiceResponse = Either<
  WorkOrderAvaliationNonExistsError,
  WorkOrderAvaliation
>

export class UpdateWorkOrderAvaliationService {
  constructor(
    private workOrderAvaliationRepository: WorkOrderAvaliationRepository,
  ) {}

  async execute({
    id,
    comment,
    rating,
  }: UpdateWorkOrderAvaliationServiceRequest): Promise<UpdateWorkOrderAvaliationServiceResponse> {
    const workOrderAvaliationExists =
      await this.workOrderAvaliationRepository.getWorkOrderAvaliationById(id)

    if (!workOrderAvaliationExists) {
      return left(new WorkOrderAvaliationNonExistsError())
    }

    workOrderAvaliationExists.comment =
      comment ?? workOrderAvaliationExists.comment
    workOrderAvaliationExists.rating =
      rating ?? workOrderAvaliationExists.rating

    return right(
      await this.workOrderAvaliationRepository.updateWorkOrderAvaliation(
        id,
        workOrderAvaliationExists,
      ),
    )
  }
}
