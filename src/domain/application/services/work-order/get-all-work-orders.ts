import { Either, left, right } from '@/@shared/either'
import { PaginationError } from '../../errors/pagination-error'
import {
  WorkOrderQueryResponse,
  WorkOrderRepository,
} from '../../repositories/work-order-repository'

type GetAllWorkOrdersServiceRequest = {
  page: number
  limit: number
}

type GetAllWorkOrdersServiceResponse = Either<
  PaginationError,
  WorkOrderQueryResponse
>

export class GetAllWorkOrdersService {
  constructor(private workOrderRepository: WorkOrderRepository) {}

  async execute({
    page,
    limit,
  }: GetAllWorkOrdersServiceRequest): Promise<GetAllWorkOrdersServiceResponse> {
    if (page <= 0 || limit <= 0) {
      return left(new PaginationError())
    }

    return right(await this.workOrderRepository.getAllWorkOrders(page, limit))
  }
}
