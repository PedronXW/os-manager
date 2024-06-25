import { Either, left, right } from '@/@shared/either'
import { PaginationError } from '../../errors/pagination-error'
import {
  WorkOrderAvaliationQueryResponse,
  WorkOrderAvaliationRepository,
} from '../../repositories/work-order-avaliation-repository'

type GetAllWorkOrderAvaliationsServiceRequest = {
  page: number
  limit: number
}

type GetAllWorkOrderAvaliationsServiceResponse = Either<
  PaginationError,
  WorkOrderAvaliationQueryResponse
>

export class GetAllWorkOrderAvaliationsService {
  constructor(
    private workOrderAvaliationRepository: WorkOrderAvaliationRepository,
  ) {}

  async execute({
    page,
    limit,
  }: GetAllWorkOrderAvaliationsServiceRequest): Promise<GetAllWorkOrderAvaliationsServiceResponse> {
    if (page <= 0 || limit <= 0) {
      return left(new PaginationError())
    }

    return right(
      await this.workOrderAvaliationRepository.getAllWorkOrderAvaliations(
        page,
        limit,
      ),
    )
  }
}
