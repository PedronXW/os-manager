import { Either, left, right } from '@/@shared/either'
import { PaginationError } from '../../errors/pagination-error'
import {
  WorkOrderResultQueryResponse,
  WorkOrderResultRepository,
} from '../../repositories/work-order-result-repository'

type GetAllWorkOrderResultsServiceRequest = {
  page: number
  limit: number
}

type GetAllWorkOrderResultsServiceResponse = Either<
  PaginationError,
  WorkOrderResultQueryResponse
>

export class GetAllWorkOrderResultsService {
  constructor(private workOrderResultRepository: WorkOrderResultRepository) {}

  async execute({
    page,
    limit,
  }: GetAllWorkOrderResultsServiceRequest): Promise<GetAllWorkOrderResultsServiceResponse> {
    if (page <= 0 || limit <= 0) {
      return left(new PaginationError())
    }

    return right(
      await this.workOrderResultRepository.getAllWorkOrderResults(page, limit),
    )
  }
}
