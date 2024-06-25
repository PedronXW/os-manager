import { Either, left, right } from '@/@shared/either'
import { WorkOrder } from '@/domain/enterprise/entities/work-order/work-order'
import { WorkOrderNonExistsError } from '../../errors/work-order-non-exists-error'
import { WorkOrderRepository } from '../../repositories/work-order-repository'

type GetWorkOrderByIdServiceRequest = {
  id: string
}

type GetWorkOrderByIdServiceResponse = Either<
  WorkOrderNonExistsError,
  WorkOrder | undefined
>

export class GetWorkOrderByIdService {
  constructor(private workorderRepository: WorkOrderRepository) {}

  async execute({
    id,
  }: GetWorkOrderByIdServiceRequest): Promise<GetWorkOrderByIdServiceResponse> {
    const workOrder = await this.workorderRepository.getWorkOrderById(id)

    if (!workOrder) {
      return left(new WorkOrderNonExistsError())
    }

    return right(workOrder)
  }
}
