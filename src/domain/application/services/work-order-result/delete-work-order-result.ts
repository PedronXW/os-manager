import { Either, left, right } from '@/@shared/either'
import { InactiveUserError } from '../../errors/inactive-user-error'
import { PermissionError } from '../../errors/permission-error'
import { UserNonExistsError } from '../../errors/user-non-exists-error'
import { Permission } from '../../permissions/permissions'
import { WorkOrderResultRepository } from '../../repositories/work-order-result-repository'
import { AuthorizationService } from '../authorization/authorization-service'

type DeleteWorkOrderResultServiceRequest = {
  id: string
}

type DeleteWorkOrderResultServiceResponse = Either<
  UserNonExistsError | PermissionError | InactiveUserError,
  void
>

export class DeleteWorkOrderResultService {
  constructor(
    private workOrderResultRepository: WorkOrderResultRepository,
    private authorizationService: AuthorizationService,
  ) {}

  async execute({
    id,
  }: DeleteWorkOrderResultServiceRequest): Promise<DeleteWorkOrderResultServiceResponse> {
    const authorizationVerify = await this.authorizationService.execute({
      necessaryRole: Permission.WORK_ORDER_RESULT_DELETE,
    })

    if (authorizationVerify.isLeft()) {
      return left(authorizationVerify.value)
    }

    return right(await this.workOrderResultRepository.deleteWorkOrderResult(id))
  }
}
