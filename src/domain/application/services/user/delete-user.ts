import { Either, left, right } from '@/@shared/either'
import { CacheRepository } from '../../cache/cache-repository'
import { InactiveUserError } from '../../errors/inactive-user-error'
import { PermissionError } from '../../errors/permission-error'
import { UserNonExistsError } from '../../errors/user-non-exists-error'
import { Permission } from '../../permissions/permissions'
import { UserRepository } from '../../repositories/user-repository'
import { AuthorizationService } from '../authorization/authorization-service'

type DeleteUserServiceRequest = {
  id: string
}

type DeleteUserServiceResponse = Either<
  UserNonExistsError | PermissionError | InactiveUserError,
  boolean
>

export class DeleteUserService {
  constructor(
    private userRepository: UserRepository,
    private cacheRepository: CacheRepository,
    private authorizationService: AuthorizationService,
  ) {}

  async execute({
    id,
  }: DeleteUserServiceRequest): Promise<DeleteUserServiceResponse> {
    const authorizationVerify = await this.authorizationService.execute({
      necessaryRole: Permission.USER_DELETE,
    })

    if (authorizationVerify.isLeft()) {
      return left(authorizationVerify.value)
    }

    const user = await this.userRepository.getUserById(id)

    if (!user) {
      return left(new UserNonExistsError())
    }

    const result = await this.userRepository.deleteUser(id)

    if (result) {
      await this.cacheRepository.set(`user:${id}`, JSON.stringify(new Date()))
    }

    return right(result)
  }
}
