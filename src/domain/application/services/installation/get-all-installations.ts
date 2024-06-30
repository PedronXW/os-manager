import { Either, left, right } from '@/@shared/either'
import { InactiveUserError } from '../../errors/inactive-user-error'
import { PaginationError } from '../../errors/pagination-error'
import { PermissionError } from '../../errors/permission-error'
import { UserNonExistsError } from '../../errors/user-non-exists-error'
import { Permission } from '../../permissions/permissions'
import {
  InstallationQueryResponse,
  InstallationRepository,
} from '../../repositories/installation-repository'
import { AuthorizationService } from '../authorization/authorization-service'

type GetAllInstallationsServiceRequest = {
  page: number
  limit: number
}

type GetAllInstallationsServiceResponse = Either<
  PaginationError | UserNonExistsError | PermissionError | InactiveUserError,
  InstallationQueryResponse
>

export class GetAllInstallationsService {
  constructor(
    private installationRepository: InstallationRepository,
    private authorizationService: AuthorizationService,
  ) {}

  async execute({
    page,
    limit,
  }: GetAllInstallationsServiceRequest): Promise<GetAllInstallationsServiceResponse> {
    const authorizationVerify = await this.authorizationService.execute({
      necessaryRole: Permission.INSTALLATION_GET,
    })

    if (authorizationVerify.isLeft()) {
      return left(authorizationVerify.value)
    }

    if (page <= 0 || limit <= 0) {
      return left(new PaginationError())
    }

    return right(
      await this.installationRepository.getAllInstallations(page, limit),
    )
  }
}
