import { Either, left, right } from '@/@shared/either'
import { InactiveUserError } from '../../errors/inactive-user-error'
import { PermissionError } from '../../errors/permission-error'
import { UserNonExistsError } from '../../errors/user-non-exists-error'
import { Permission } from '../../permissions/permissions'
import { RoleRepository } from '../../repositories/role-repository'
import { AuthorizationService } from '../authorization/authorization-service'

type DeleteRoleServiceRequest = {
  id: string
}

type DeleteRoleServiceResponse = Either<
  UserNonExistsError | PermissionError | InactiveUserError,
  void
>

export class DeleteRoleService {
  constructor(
    private roleRepository: RoleRepository,
    private authorizationService: AuthorizationService,
  ) {}

  async execute({
    id,
  }: DeleteRoleServiceRequest): Promise<DeleteRoleServiceResponse> {
    const authorizationVerify = await this.authorizationService.execute({
      necessaryRole: Permission.ROLE_DELETE,
    })

    if (authorizationVerify.isLeft()) {
      return left(authorizationVerify.value)
    }

    return right(await this.roleRepository.deleteRole(id))
  }
}
