import { Either, left, right } from '@/@shared/either'
import { Installation } from '@/domain/enterprise/entities/installation/installation'
import { InactiveUserError } from '../../errors/inactive-user-error'
import { InstallationNonExistsError } from '../../errors/installation-non-exists-error'
import { PermissionError } from '../../errors/permission-error'
import { UserNonExistsError } from '../../errors/user-non-exists-error'
import { Permission } from '../../permissions/permissions'
import { InstallationRepository } from '../../repositories/installation-repository'
import { AuthorizationService } from '../authorization/authorization-service'

type UpdateInstallationServiceRequest = {
  id: string
  name?: string
  description?: string
}

type UpdateInstallationServiceResponse = Either<
  | InstallationNonExistsError
  | UserNonExistsError
  | PermissionError
  | InactiveUserError,
  Installation
>

export class UpdateInstallationService {
  constructor(
    private installationRepository: InstallationRepository,
    private authorizationService: AuthorizationService,
  ) {}

  async execute({
    id,
    name,
    description,
  }: UpdateInstallationServiceRequest): Promise<UpdateInstallationServiceResponse> {
    const authorizationVerify = await this.authorizationService.execute({
      necessaryRole: Permission.INSTALLATION_UPDATE,
    })

    if (authorizationVerify.isLeft()) {
      return left(authorizationVerify.value)
    }

    const installationExists =
      await this.installationRepository.getInstallationById(id)

    if (!installationExists) {
      return left(new InstallationNonExistsError())
    }

    installationExists.name = name ?? installationExists.name
    installationExists.description =
      description ?? installationExists.description

    return right(
      await this.installationRepository.updateInstallation(
        id,
        installationExists,
      ),
    )
  }
}
