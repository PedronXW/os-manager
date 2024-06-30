import { Either, left, right } from '@/@shared/either'
import { InactiveUserError } from '../../errors/inactive-user-error'
import { PermissionError } from '../../errors/permission-error'
import { UserNonExistsError } from '../../errors/user-non-exists-error'
import { Permission } from '../../permissions/permissions'
import { InstallationRepository } from '../../repositories/installation-repository'
import { AuthorizationService } from '../authorization/authorization-service'

type DeleteInstallationServiceRequest = {
  id: string
}

type DeleteInstallationServiceResponse = Either<
  UserNonExistsError | PermissionError | InactiveUserError,
  void
>

export class DeleteInstallationService {
  constructor(
    private installationRepository: InstallationRepository,
    private authorizationService: AuthorizationService,
  ) {}

  async execute({
    id,
  }: DeleteInstallationServiceRequest): Promise<DeleteInstallationServiceResponse> {
    const authorizationVerify = await this.authorizationService.execute({
      necessaryRole: Permission.INSTALLATION_DELETE,
    })

    if (authorizationVerify.isLeft()) {
      return left(authorizationVerify.value)
    }

    return right(await this.installationRepository.deleteInstallation(id))
  }
}
