import { Either, left, right } from '@/@shared/either'
import { Role } from '@/domain/enterprise/entities/role/role'
import { InactiveUserError } from '../../errors/inactive-user-error'
import { PermissionError } from '../../errors/permission-error'
import { RoleNonExistsError } from '../../errors/role-non-exists-error'
import { UserNonExistsError } from '../../errors/user-non-exists-error'
import { Permission } from '../../permissions/permissions'
import { RoleRepository } from '../../repositories/role-repository'
import { AuthorizationService } from '../authorization/authorization-service'

type UpdateRoleServiceRequest = {
  id: string
  name?: string
  description?: string
  permissions?: Permission[]
}

type UpdateRoleServiceResponse = Either<
  RoleNonExistsError | UserNonExistsError | PermissionError | InactiveUserError,
  Role
>

export class UpdateRoleService {
  constructor(
    private roleRepository: RoleRepository,
    private authorizationService: AuthorizationService,
  ) {}

  async execute({
    id,
    name,
    description,
    permissions,
  }: UpdateRoleServiceRequest): Promise<UpdateRoleServiceResponse> {
    const authorizationVerify = await this.authorizationService.execute({
      necessaryRole: Permission.ROLE_UPDATE,
    })

    if (authorizationVerify.isLeft()) {
      return left(authorizationVerify.value)
    }

    const roleExists = await this.roleRepository.getRoleById(id)

    if (!roleExists) {
      return left(new RoleNonExistsError())
    }

    roleExists.name = name ?? roleExists.name
    roleExists.description = description ?? roleExists.description
    roleExists.permissions = permissions ?? roleExists.permissions

    return right(await this.roleRepository.updateRole(id, roleExists))
  }
}
