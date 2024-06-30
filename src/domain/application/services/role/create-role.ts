import { Either, left, right } from '@/@shared/either'
import { EntityId } from '@/@shared/entities/entity-id'
import { Role } from '@/domain/enterprise/entities/role/role'
import { InactiveUserError } from '../../errors/inactive-user-error'
import { PermissionError } from '../../errors/permission-error'
import { UserNonExistsError } from '../../errors/user-non-exists-error'
import { Permission } from '../../permissions/permissions'
import { RoleRepository } from '../../repositories/role-repository'
import { AuthorizationService } from '../authorization/authorization-service'

type CreateRoleServiceRequest = {
  name: string
  description: string
  creatorId: string
}

type CreateRoleServiceResponse = Either<
  UserNonExistsError | PermissionError | InactiveUserError,
  Role
>

export class CreateRoleService {
  constructor(
    private roleRepository: RoleRepository,
    private authorizationService: AuthorizationService,
  ) {}

  async execute({
    name,
    description,
    creatorId,
  }: CreateRoleServiceRequest): Promise<CreateRoleServiceResponse> {
    const authorizationVerify = await this.authorizationService.execute({
      necessaryRole: Permission.ROLE_CREATE,
    })

    if (authorizationVerify.isLeft()) {
      return left(authorizationVerify.value)
    }

    const role = Role.create({
      name,
      description,
      permissions: [],
      createdBy: new EntityId(creatorId),
    })

    return right(await this.roleRepository.createRole(role))
  }
}
