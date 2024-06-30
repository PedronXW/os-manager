import { Either, left, right } from '@/@shared/either'
import { WorkOrderResult } from '@/domain/enterprise/entities/work-order-result/work-order-result'
import { InactiveUserError } from '../../errors/inactive-user-error'
import { PermissionError } from '../../errors/permission-error'
import { UserNonExistsError } from '../../errors/user-non-exists-error'
import { WorkOrderResultNonExistsError } from '../../errors/work-order-result-non-exists-error'
import { Permission } from '../../permissions/permissions'
import { WorkOrderResultRepository } from '../../repositories/work-order-result-repository'
import { AuthorizationService } from '../authorization/authorization-service'

type GetWorkOrderResultByIdServiceRequest = {
  id: string
}

type GetWorkOrderResultByIdServiceResponse = Either<
  | WorkOrderResultNonExistsError
  | UserNonExistsError
  | PermissionError
  | InactiveUserError,
  WorkOrderResult | undefined
>

export class GetWorkOrderResultByIdService {
  constructor(
    private workOrderResultRepository: WorkOrderResultRepository,
    private authorizationService: AuthorizationService,
  ) {}

  async execute({
    id,
  }: GetWorkOrderResultByIdServiceRequest): Promise<GetWorkOrderResultByIdServiceResponse> {
    const authorizationVerify = await this.authorizationService.execute({
      necessaryRole: Permission.WORK_ORDER_RESULT_GET,
    })

    if (authorizationVerify.isLeft()) {
      return left(authorizationVerify.value)
    }

    const workOrderResult =
      await this.workOrderResultRepository.getWorkOrderResultById(id)

    if (!workOrderResult) {
      return left(new WorkOrderResultNonExistsError())
    }

    return right(workOrderResult)
  }
}
