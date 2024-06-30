import { Either, left, right } from '@/@shared/either'
import { WorkOrderAvaliation } from '@/domain/enterprise/entities/work-order-avaliation/work-order-avaliation'
import { InactiveUserError } from '../../errors/inactive-user-error'
import { PermissionError } from '../../errors/permission-error'
import { UserNonExistsError } from '../../errors/user-non-exists-error'
import { WorkOrderAvaliationNonExistsError } from '../../errors/work-order-avaliation-non-exists-error'
import { Permission } from '../../permissions/permissions'
import { WorkOrderAvaliationRepository } from '../../repositories/work-order-avaliation-repository'
import { AuthorizationService } from '../authorization/authorization-service'

type UpdateWorkOrderAvaliationServiceRequest = {
  id: string
  comment?: string
  rating?: number
}

type UpdateWorkOrderAvaliationServiceResponse = Either<
  | WorkOrderAvaliationNonExistsError
  | UserNonExistsError
  | PermissionError
  | InactiveUserError,
  WorkOrderAvaliation
>

export class UpdateWorkOrderAvaliationService {
  constructor(
    private workOrderAvaliationRepository: WorkOrderAvaliationRepository,
    private authorizationService: AuthorizationService,
  ) {}

  async execute({
    id,
    comment,
    rating,
  }: UpdateWorkOrderAvaliationServiceRequest): Promise<UpdateWorkOrderAvaliationServiceResponse> {
    const authorizationVerify = await this.authorizationService.execute({
      necessaryRole: Permission.WORK_ORDER_AVALIATION_UPDATE,
    })

    if (authorizationVerify.isLeft()) {
      return left(authorizationVerify.value)
    }

    const workOrderAvaliationExists =
      await this.workOrderAvaliationRepository.getWorkOrderAvaliationById(id)

    if (!workOrderAvaliationExists) {
      return left(new WorkOrderAvaliationNonExistsError())
    }

    workOrderAvaliationExists.comment =
      comment ?? workOrderAvaliationExists.comment
    workOrderAvaliationExists.rating =
      rating ?? workOrderAvaliationExists.rating

    return right(
      await this.workOrderAvaliationRepository.updateWorkOrderAvaliation(
        id,
        workOrderAvaliationExists,
      ),
    )
  }
}
