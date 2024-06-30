import { Either, left, right } from '@/@shared/either'
import { WorkOrder } from '@/domain/enterprise/entities/work-order/work-order'
import { InactiveUserError } from '../../errors/inactive-user-error'
import { PermissionError } from '../../errors/permission-error'
import { UserNonExistsError } from '../../errors/user-non-exists-error'
import { WorkOrderNonExistsError } from '../../errors/work-order-non-exists-error'
import { Permission } from '../../permissions/permissions'
import { WorkOrderRepository } from '../../repositories/work-order-repository'
import { AuthorizationService } from '../authorization/authorization-service'

type UpdateWorkOrderServiceRequest = {
  id: string
  description?: string
}

type UpdateWorkOrderServiceResponse = Either<
  | WorkOrderNonExistsError
  | UserNonExistsError
  | PermissionError
  | InactiveUserError,
  WorkOrder
>

export class UpdateWorkOrderService {
  constructor(
    private workOrderRepository: WorkOrderRepository,
    private authorizationService: AuthorizationService,
  ) {}

  async execute({
    id,
    description,
  }: UpdateWorkOrderServiceRequest): Promise<UpdateWorkOrderServiceResponse> {
    const authorizationVerify = await this.authorizationService.execute({
      necessaryRole: Permission.WORK_ORDER_UPDATE,
    })

    if (authorizationVerify.isLeft()) {
      return left(authorizationVerify.value)
    }

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
