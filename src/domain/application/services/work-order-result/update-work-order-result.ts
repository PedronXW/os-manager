import { Either, left, right } from '@/@shared/either'
import { WorkOrderResult } from '@/domain/enterprise/entities/work-order-result/work-order-result'
import { InactiveUserError } from '../../errors/inactive-user-error'
import { PermissionError } from '../../errors/permission-error'
import { UserNonExistsError } from '../../errors/user-non-exists-error'
import { WorkOrderResultNonExistsError } from '../../errors/work-order-result-non-exists-error'
import { Permission } from '../../permissions/permissions'
import { WorkOrderResultRepository } from '../../repositories/work-order-result-repository'
import { AuthorizationService } from '../authorization/authorization-service'

type UpdateWorkOrderResultServiceRequest = {
  id: string
  description?: string
  price?: number
}

type UpdateWorkOrderResultServiceResponse = Either<
  | WorkOrderResultNonExistsError
  | UserNonExistsError
  | PermissionError
  | InactiveUserError,
  WorkOrderResult
>

export class UpdateWorkOrderResultService {
  constructor(
    private workOrderResultRepository: WorkOrderResultRepository,
    private authorizationService: AuthorizationService,
  ) {}

  async execute({
    id,
    description,
    price,
  }: UpdateWorkOrderResultServiceRequest): Promise<UpdateWorkOrderResultServiceResponse> {
    const authorizationVerify = await this.authorizationService.execute({
      necessaryRole: Permission.WORK_ORDER_RESULT_UPDATE,
    })

    if (authorizationVerify.isLeft()) {
      return left(authorizationVerify.value)
    }

    const workOrderResultExists =
      await this.workOrderResultRepository.getWorkOrderResultById(id)

    if (!workOrderResultExists) {
      return left(new WorkOrderResultNonExistsError())
    }

    workOrderResultExists.description =
      description ?? workOrderResultExists.description
    workOrderResultExists.price = price ?? workOrderResultExists.price

    return right(
      await this.workOrderResultRepository.updateWorkOrderResult(
        id,
        workOrderResultExists,
      ),
    )
  }
}
