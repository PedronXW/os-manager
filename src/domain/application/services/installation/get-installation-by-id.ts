import { Either, left, right } from '@/@shared/either'
import { Installation } from '@/domain/enterprise/entities/installation/installation'
import { InactiveUserError } from '../../errors/inactive-user-error'
import { InstallationNonExistsError } from '../../errors/installation-non-exists-error'
import { PermissionError } from '../../errors/permission-error'
import { UserNonExistsError } from '../../errors/user-non-exists-error'
import { Permission } from '../../permissions/permissions'
import { InstallationRepository } from '../../repositories/installation-repository'
import { AuthorizationService } from '../authorization/authorization-service'

type GetInstallationByIdServiceRequest = {
  id: string
}

type GetInstallationByIdServiceResponse = Either<
  | InstallationNonExistsError
  | UserNonExistsError
  | PermissionError
  | InactiveUserError,
  Installation | undefined
>

export class GetInstallationByIdService {
  constructor(
    private installationRepository: InstallationRepository,
    private authorizationService: AuthorizationService,
  ) {}

  async execute({
    id,
  }: GetInstallationByIdServiceRequest): Promise<GetInstallationByIdServiceResponse> {
    const authorizationVerify = await this.authorizationService.execute({
      necessaryRole: Permission.INSTALLATION_GET,
    })

    if (authorizationVerify.isLeft()) {
      return left(authorizationVerify.value)
    }

    const installation =
      await this.installationRepository.getInstallationById(id)

    if (!installation) {
      return left(new InstallationNonExistsError())
    }

    return right(installation)
  }
}
