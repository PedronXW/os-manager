import { Either, left, right } from '@/@shared/either'
import { WorkOrderAvaliation } from '@/domain/enterprise/entities/work-order-avaliation/work-order-avaliation'
import { InactiveUserError } from '../../errors/inactive-user-error'
import { PermissionError } from '../../errors/permission-error'
import { UserNonExistsError } from '../../errors/user-non-exists-error'
import { WorkOrderAvaliationNonExistsError } from '../../errors/work-order-avaliation-non-exists-error'
import { Permission } from '../../permissions/permissions'
import { WorkOrderAvaliationRepository } from '../../repositories/work-order-avaliation-repository'
import { AuthorizationService } from '../authorization/authorization-service'

type GetWorkOrderAvaliationByIdServiceRequest = {
  id: string
}

type GetWorkOrderAvaliationByIdServiceResponse = Either<
  | WorkOrderAvaliationNonExistsError
  | UserNonExistsError
  | PermissionError
  | InactiveUserError,
  WorkOrderAvaliation | undefined
>

export class GetWorkOrderAvaliationByIdService {
  constructor(
    private workOrderAvaliationRepository: WorkOrderAvaliationRepository,
    private authorizationService: AuthorizationService,
  ) {}

  async execute({
    id,
  }: GetWorkOrderAvaliationByIdServiceRequest): Promise<GetWorkOrderAvaliationByIdServiceResponse> {
    const authorizationVerify = await this.authorizationService.execute({
      necessaryRole: Permission.WORK_ORDER_AVALIATION_GET,
    })

    if (authorizationVerify.isLeft()) {
      return left(authorizationVerify.value)
    }

    const workOrderAvaliation =
      await this.workOrderAvaliationRepository.getWorkOrderAvaliationById(id)

    if (!workOrderAvaliation) {
      return left(new WorkOrderAvaliationNonExistsError())
    }

    return right(workOrderAvaliation)
  }
}
