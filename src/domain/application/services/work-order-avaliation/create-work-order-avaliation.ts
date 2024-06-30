import { Either, left, right } from '@/@shared/either'
import { WorkOrderAvaliation } from '@/domain/enterprise/entities/work-order-avaliation/work-order-avaliation'
import { ClientNonExistsError } from '../../errors/client-non-exists-error'
import { InactiveClientError } from '../../errors/inactive-client-error'
import { InactiveUserError } from '../../errors/inactive-user-error'
import { InactiveWorkOrderError } from '../../errors/inactive-work-order-error'
import { PermissionError } from '../../errors/permission-error'
import { UserNonExistsError } from '../../errors/user-non-exists-error'
import { WorkOrderNonExistsError } from '../../errors/work-order-non-exists-error'
import { Permission } from '../../permissions/permissions'
import { WorkOrderAvaliationRepository } from '../../repositories/work-order-avaliation-repository'
import { WorkOrderRepository } from '../../repositories/work-order-repository'
import { AuthorizationService } from '../authorization/authorization-service'

type CreateWorkOrderAvaliationServiceRequest = {
  comment: string
  rating: number
  workOrderId: string
}

type CreateWorkOrderAvaliationServiceResponse = Either<
  | ClientNonExistsError
  | InactiveClientError
  | UserNonExistsError
  | PermissionError
  | InactiveUserError,
  WorkOrderAvaliation
>

export class CreateWorkOrderAvaliationService {
  constructor(
    private workOrderAvaliationRepository: WorkOrderAvaliationRepository,
    private workOrderRepository: WorkOrderRepository,
    private authorizationService: AuthorizationService,
  ) {}

  async execute({
    comment,
    rating,
    workOrderId,
  }: CreateWorkOrderAvaliationServiceRequest): Promise<CreateWorkOrderAvaliationServiceResponse> {
    const authorizationVerify = await this.authorizationService.execute({
      necessaryRole: Permission.WORK_ORDER_AVALIATION_CREATE,
    })

    if (authorizationVerify.isLeft()) {
      return left(authorizationVerify.value)
    }

    const verifyWorkOrder =
      await this.workOrderRepository.getWorkOrderById(workOrderId)

    if (!verifyWorkOrder) {
      return left(new WorkOrderNonExistsError())
    }

    if (!verifyWorkOrder.active) {
      return left(new InactiveWorkOrderError())
    }

    const workOrderAvaliation = WorkOrderAvaliation.create({
      comment,
      rating,
      workOrderId: verifyWorkOrder.id,
    })

    return right(
      await this.workOrderAvaliationRepository.createWorkOrderAvaliation(
        workOrderAvaliation,
      ),
    )
  }
}
