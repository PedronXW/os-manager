import { Either, left, right } from '@/@shared/either'
import { User } from '@/domain/enterprise/entities/user/user'
import { InactiveUserError } from '../../errors/inactive-user-error'
import { PermissionError } from '../../errors/permission-error'
import { UserNonExistsError } from '../../errors/user-non-exists-error'
import { Permission } from '../../permissions/permissions'
import { UserRepository } from '../../repositories/user-repository'

type AuthorizationServiceRequest = {
  necessaryRole: Permission
}

type AuthorizationServiceResponse = Either<
  PermissionError | UserNonExistsError | InactiveUserError,
  User
>

export class AuthorizationService {
  constructor(
    private userRepository: UserRepository,
    private userId: string,
  ) {}

  async execute({
    necessaryRole,
  }: AuthorizationServiceRequest): Promise<AuthorizationServiceResponse> {
    const user = await this.userRepository.getUserById(this.userId)

    if (!user) {
      return left(new UserNonExistsError())
    }

    if (!user.active) {
      return left(new InactiveUserError())
    }

    if (
      user.permissions.filter((permission) => permission === necessaryRole)
        .length > 0
    ) {
      return right(user)
    }

    return left(new PermissionError())
  }
}
