import { Either, left, right } from '@/@shared/either'
import { InactiveUserError } from '../../errors/inactive-user-error'
import { PermissionError } from '../../errors/permission-error'
import { UserNonExistsError } from '../../errors/user-non-exists-error'
import { Permission } from '../../permissions/permissions'
import { WorkOrderAvaliationRepository } from '../../repositories/work-order-avaliation-repository'
import { AuthorizationService } from '../authorization/authorization-service'

type DeleteWorkOrderAvaliationServiceRequest = {
  id: string
}

type DeleteWorkOrderAvaliationServiceResponse = Either<
  UserNonExistsError | PermissionError | InactiveUserError,
  void
>

export class DeleteWorkOrderAvaliationService {
  constructor(
    private workOrderAvaliationRepository: WorkOrderAvaliationRepository,
    private authorizationService: AuthorizationService,
  ) {}

  async execute({
    id,
  }: DeleteWorkOrderAvaliationServiceRequest): Promise<DeleteWorkOrderAvaliationServiceResponse> {
    const authorizationVerify = await this.authorizationService.execute({
      necessaryRole: Permission.WORK_ORDER_AVALIATION_DELETE,
    })

    if (authorizationVerify.isLeft()) {
      return left(authorizationVerify.value)
    }

    return right(
      await this.workOrderAvaliationRepository.deleteWorkOrderAvaliation(id),
    )
  }
}
