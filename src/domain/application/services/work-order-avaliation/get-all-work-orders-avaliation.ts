import { Either, left, right } from '@/@shared/either'
import { InactiveUserError } from '../../errors/inactive-user-error'
import { PaginationError } from '../../errors/pagination-error'
import { PermissionError } from '../../errors/permission-error'
import { UserNonExistsError } from '../../errors/user-non-exists-error'
import { Permission } from '../../permissions/permissions'
import {
  WorkOrderAvaliationQueryResponse,
  WorkOrderAvaliationRepository,
} from '../../repositories/work-order-avaliation-repository'
import { AuthorizationService } from '../authorization/authorization-service'

type GetAllWorkOrderAvaliationsServiceRequest = {
  page: number
  limit: number
}

type GetAllWorkOrderAvaliationsServiceResponse = Either<
  PaginationError | UserNonExistsError | PermissionError | InactiveUserError,
  WorkOrderAvaliationQueryResponse
>

export class GetAllWorkOrderAvaliationsService {
  constructor(
    private workOrderAvaliationRepository: WorkOrderAvaliationRepository,
    private authorizationService: AuthorizationService,
  ) {}

  async execute({
    page,
    limit,
  }: GetAllWorkOrderAvaliationsServiceRequest): Promise<GetAllWorkOrderAvaliationsServiceResponse> {
    const authorizationVerify = await this.authorizationService.execute({
      necessaryRole: Permission.WORK_ORDER_AVALIATION_GET,
    })

    if (authorizationVerify.isLeft()) {
      return left(authorizationVerify.value)
    }

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
