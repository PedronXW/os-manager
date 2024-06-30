import { Either, left, right } from '@/@shared/either'
import { Role } from '@/domain/enterprise/entities/role/role'
import { InactiveUserError } from '../../errors/inactive-user-error'
import { PermissionError } from '../../errors/permission-error'
import { RoleNonExistsError } from '../../errors/role-non-exists-error'
import { UserNonExistsError } from '../../errors/user-non-exists-error'
import { Permission } from '../../permissions/permissions'
import { RoleRepository } from '../../repositories/role-repository'
import { AuthorizationService } from '../authorization/authorization-service'

type GetRoleByIdServiceRequest = {
  id: string
}

type GetRoleByIdServiceResponse = Either<
  RoleNonExistsError | UserNonExistsError | PermissionError | InactiveUserError,
  Role | undefined
>

export class GetRoleByIdService {
  constructor(
    private roleRepository: RoleRepository,
    private authorizationService: AuthorizationService,
  ) {}

  async execute({
    id,
  }: GetRoleByIdServiceRequest): Promise<GetRoleByIdServiceResponse> {
    const authorizationVerify = await this.authorizationService.execute({
      necessaryRole: Permission.ROLE_GET,
    })

    if (authorizationVerify.isLeft()) {
      return left(authorizationVerify.value)
    }

    const role = await this.roleRepository.getRoleById(id)

    if (!role) {
      return left(new RoleNonExistsError())
    }

    return right(role)
  }
}
