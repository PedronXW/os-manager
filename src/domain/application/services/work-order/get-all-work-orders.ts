import { Either, left, right } from '@/@shared/either'
import { InactiveUserError } from '../../errors/inactive-user-error'
import { PaginationError } from '../../errors/pagination-error'
import { PermissionError } from '../../errors/permission-error'
import { UserNonExistsError } from '../../errors/user-non-exists-error'
import { Permission } from '../../permissions/permissions'
import {
  WorkOrderQueryResponse,
  WorkOrderRepository,
} from '../../repositories/work-order-repository'
import { AuthorizationService } from '../authorization/authorization-service'

type GetAllWorkOrdersServiceRequest = {
  page: number
  limit: number
}

type GetAllWorkOrdersServiceResponse = Either<
  PaginationError | UserNonExistsError | PermissionError | InactiveUserError,
  WorkOrderQueryResponse
>

export class GetAllWorkOrdersService {
  constructor(
    private workOrderRepository: WorkOrderRepository,
    private authorizationService: AuthorizationService,
  ) {}

  async execute({
    page,
    limit,
  }: GetAllWorkOrdersServiceRequest): Promise<GetAllWorkOrdersServiceResponse> {
    const authorizationVerify = await this.authorizationService.execute({
      necessaryRole: Permission.WORK_ORDER_GET,
    })

    if (authorizationVerify.isLeft()) {
      return left(authorizationVerify.value)
    }

    if (page <= 0 || limit <= 0) {
      return left(new PaginationError())
    }

    return right(await this.workOrderRepository.getAllWorkOrders(page, limit))
  }
}
