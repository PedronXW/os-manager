import { Either, left, right } from '@/@shared/either'
import { EntityId } from '@/@shared/entities/entity-id'
import { WorkOrderResult } from '@/domain/enterprise/entities/work-order-result/work-order-result'
import { ClientNonExistsError } from '../../errors/client-non-exists-error'
import { InactiveClientError } from '../../errors/inactive-client-error'
import { InactiveUserError } from '../../errors/inactive-user-error'
import { InactiveWorkOrderError } from '../../errors/inactive-work-order-error'
import { PermissionError } from '../../errors/permission-error'
import { UserNonExistsError } from '../../errors/user-non-exists-error'
import { WorkOrderNonExistsError } from '../../errors/work-order-non-exists-error'
import { Permission } from '../../permissions/permissions'
import { WorkOrderRepository } from '../../repositories/work-order-repository'
import { WorkOrderResultRepository } from '../../repositories/work-order-result-repository'
import { AuthorizationService } from '../authorization/authorization-service'

type CreateWorkOrderResultServiceRequest = {
  description: string
  price: number
  createdBy: string
  workOrderId: string
}

type CreateWorkOrderResultServiceResponse = Either<
  | ClientNonExistsError
  | InactiveClientError
  | UserNonExistsError
  | PermissionError
  | InactiveUserError,
  WorkOrderResult
>

export class CreateWorkOrderResultService {
  constructor(
    private workOrderResultRepository: WorkOrderResultRepository,
    private workOrderRepository: WorkOrderRepository,
    private authorizationService: AuthorizationService,
  ) {}

  async execute({
    description,
    price,
    workOrderId,
    createdBy,
  }: CreateWorkOrderResultServiceRequest): Promise<CreateWorkOrderResultServiceResponse> {
    const authorizationVerify = await this.authorizationService.execute({
      necessaryRole: Permission.WORK_ORDER_RESULT_CREATE,
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

    const workOrderResult = WorkOrderResult.create({
      description,
      price,
      createdBy: new EntityId(createdBy),
      workOrderId: verifyWorkOrder.id,
    })

    return right(
      await this.workOrderResultRepository.createWorkOrderResult(
        workOrderResult,
      ),
    )
  }
}
