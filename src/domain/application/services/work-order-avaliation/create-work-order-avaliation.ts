import { Either, left, right } from '@/@shared/either'
import { WorkOrderAvaliation } from '@/domain/enterprise/entities/work-order-avaliation/work-order-avaliation'
import { ClientNonExistsError } from '../../errors/client-non-exists-error'
import { InactiveClientError } from '../../errors/inactive-client-error'
import { InactiveWorkOrderError } from '../../errors/inactive-work-order-error'
import { WorkOrderNonExistsError } from '../../errors/work-order-non-exists-error'
import { WorkOrderAvaliationRepository } from '../../repositories/work-order-avaliation-repository'
import { WorkOrderRepository } from '../../repositories/work-order-repository'

type CreateWorkOrderAvaliationServiceRequest = {
  comment: string
  rating: number
  workOrderId: string
}

type CreateWorkOrderAvaliationServiceResponse = Either<
  ClientNonExistsError | InactiveClientError,
  WorkOrderAvaliation
>

export class CreateWorkOrderAvaliationService {
  constructor(
    private workOrderAvaliationRepository: WorkOrderAvaliationRepository,
    private workOrderRepository: WorkOrderRepository,
  ) {}

  async execute({
    comment,
    rating,
    workOrderId,
  }: CreateWorkOrderAvaliationServiceRequest): Promise<CreateWorkOrderAvaliationServiceResponse> {
    const verifyWorkOrder =
      await this.workOrderRepository.getWorkOrderById(workOrderId)

    if (!verifyWorkOrder) {
      return left(new WorkOrderNonExistsError())
    }

    if (!verifyWorkOrder.active) {
      return left(new InactiveWorkOrderError())
    }

    const workOrderAvaliation = WorkOrderAvaliation.create({
      comment,
      rating,
      workOrderId: verifyWorkOrder.id,
    })

    return right(
      await this.workOrderAvaliationRepository.createWorkOrderAvaliation(
        workOrderAvaliation,
      ),
    )
  }
}
