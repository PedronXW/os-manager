import { Either, left, right } from '@/@shared/either'
import { WorkOrder } from '@/domain/enterprise/entities/work-order/work-order'
import { WorkOrderNonExistsError } from '../../errors/work-order-non-exists-error'
import { WorkOrderRepository } from '../../repositories/work-order-repository'

type UpdateWorkOrderServiceRequest = {
  id: string
  description?: string
}

type UpdateWorkOrderServiceResponse = Either<WorkOrderNonExistsError, WorkOrder>

export class UpdateWorkOrderService {
  constructor(private workOrderRepository: WorkOrderRepository) {}

  async execute({
    id,
    description,
  }: UpdateWorkOrderServiceRequest): Promise<UpdateWorkOrderServiceResponse> {
    const workOrderExists = await this.workOrderRepository.getWorkOrderById(id)

    if (!workOrderExists) {
      return left(new WorkOrderNonExistsError())
    }

    workOrderExists.description = description ?? workOrderExists.description

    return right(
      await this.workOrderRepository.updateWorkOrder(id, workOrderExists),
    )
  }
}
