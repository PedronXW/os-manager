import { Either, left, right } from '@/@shared/either'
import { InactiveUserError } from '../../errors/inactive-user-error'
import { PermissionError } from '../../errors/permission-error'
import { UserNonExistsError } from '../../errors/user-non-exists-error'
import { Permission } from '../../permissions/permissions'
import { WorkOrderRepository } from '../../repositories/work-order-repository'
import { AuthorizationService } from '../authorization/authorization-service'

type DeleteWorkOrderServiceRequest = {
  id: string
}

type DeleteWorkOrderServiceResponse = Either<
  UserNonExistsError | PermissionError | InactiveUserError,
  void
>

export class DeleteWorkOrderService {
  constructor(
    private workOrderRepository: WorkOrderRepository,
    private authorizationService: AuthorizationService,
  ) {}

  async execute({
    id,
  }: DeleteWorkOrderServiceRequest): Promise<DeleteWorkOrderServiceResponse> {
    const authorizationVerify = await this.authorizationService.execute({
      necessaryRole: Permission.WORK_ORDER_DELETE,
    })

    if (authorizationVerify.isLeft()) {
      return left(authorizationVerify.value)
    }

    return right(await this.workOrderRepository.deleteWorkOrder(id))
  }
}
