import { Either, left, right } from '@/@shared/either'
import { InactiveUserError } from '../../errors/inactive-user-error'
import { PaginationError } from '../../errors/pagination-error'
import { PermissionError } from '../../errors/permission-error'
import { UserNonExistsError } from '../../errors/user-non-exists-error'
import { Permission } from '../../permissions/permissions'
import {
  WorkOrderResultQueryResponse,
  WorkOrderResultRepository,
} from '../../repositories/work-order-result-repository'
import { AuthorizationService } from '../authorization/authorization-service'

type GetAllWorkOrderResultsServiceRequest = {
  page: number
  limit: number
}

type GetAllWorkOrderResultsServiceResponse = Either<
  PaginationError | UserNonExistsError | PermissionError | InactiveUserError,
  WorkOrderResultQueryResponse
>

export class GetAllWorkOrderResultsService {
  constructor(
    private workOrderResultRepository: WorkOrderResultRepository,
    private authorizationService: AuthorizationService,
  ) {}

  async execute({
    page,
    limit,
  }: GetAllWorkOrderResultsServiceRequest): Promise<GetAllWorkOrderResultsServiceResponse> {
    const authorizationVerify = await this.authorizationService.execute({
      necessaryRole: Permission.WORK_ORDER_RESULT_GET,
    })

    if (authorizationVerify.isLeft()) {
      return left(authorizationVerify.value)
    }

    if (page <= 0 || limit <= 0) {
      return left(new PaginationError())
    }

    return right(
      await this.workOrderResultRepository.getAllWorkOrderResults(page, limit),
    )
  }
}
