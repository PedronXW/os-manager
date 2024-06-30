import { Either, left, right } from '@/@shared/either'
import { WorkOrder } from '@/domain/enterprise/entities/work-order/work-order'
import { InactiveUserError } from '../../errors/inactive-user-error'
import { PermissionError } from '../../errors/permission-error'
import { UserNonExistsError } from '../../errors/user-non-exists-error'
import { WorkOrderNonExistsError } from '../../errors/work-order-non-exists-error'
import { Permission } from '../../permissions/permissions'
import { WorkOrderRepository } from '../../repositories/work-order-repository'
import { AuthorizationService } from '../authorization/authorization-service'

type GetWorkOrderByIdServiceRequest = {
  id: string
}

type GetWorkOrderByIdServiceResponse = Either<
  | WorkOrderNonExistsError
  | UserNonExistsError
  | PermissionError
  | InactiveUserError,
  WorkOrder | undefined
>

export class GetWorkOrderByIdService {
  constructor(
    private workorderRepository: WorkOrderRepository,
    private authorizationService: AuthorizationService,
  ) {}

  async execute({
    id,
  }: GetWorkOrderByIdServiceRequest): Promise<GetWorkOrderByIdServiceResponse> {
    const authorizationVerify = await this.authorizationService.execute({
      necessaryRole: Permission.WORK_ORDER_GET,
    })

    if (authorizationVerify.isLeft()) {
      return left(authorizationVerify.value)
    }

    const workOrder = await this.workorderRepository.getWorkOrderById(id)

    if (!workOrder) {
      return left(new WorkOrderNonExistsError())
    }

    return right(workOrder)
  }
}
