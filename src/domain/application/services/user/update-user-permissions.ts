import { Either, left, right } from '@/@shared/either'
import { User } from '@/domain/enterprise/entities/user/user'
import { InactiveUserError } from '../../errors/inactive-user-error'
import { PermissionError } from '../../errors/permission-error'
import { UserNonExistsError } from '../../errors/user-non-exists-error'
import { Permission } from '../../permissions/permissions'
import { UserRepository } from '../../repositories/user-repository'
import { AuthorizationService } from '../authorization/authorization-service'

type EditUserPermissionsServiceResponse = Either<
  UserNonExistsError | PermissionError | InactiveUserError,
  User
>

type EditUserPermissionsRequest = {
  id: string
  permissions: Permission[]
}

export class EditUserPermissionsService {
  constructor(
    private userRepository: UserRepository,
    private authorizationService: AuthorizationService,
  ) {}

  async execute({
    id,
    permissions,
  }: EditUserPermissionsRequest): Promise<EditUserPermissionsServiceResponse> {
    const authorizationVerify = await this.authorizationService.execute({
      necessaryRole: Permission.USER_UPDATE,
    })

    if (authorizationVerify.isLeft()) {
      return left(authorizationVerify.value)
    }

    authorizationVerify.value.permissions = permissions

    const updatedUser = await this.userRepository.editUser(
      id,
      authorizationVerify.value,
    )

    return right(updatedUser)
  }
}
