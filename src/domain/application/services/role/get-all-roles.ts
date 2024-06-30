import { Either, left, right } from '@/@shared/either'
import { InactiveUserError } from '../../errors/inactive-user-error'
import { PaginationError } from '../../errors/pagination-error'
import { PermissionError } from '../../errors/permission-error'
import { UserNonExistsError } from '../../errors/user-non-exists-error'
import { Permission } from '../../permissions/permissions'
import {
  RoleQueryResponse,
  RoleRepository,
} from '../../repositories/role-repository'
import { AuthorizationService } from '../authorization/authorization-service'

type GetAllRolesServiceRequest = {
  page: number
  limit: number
}

type GetAllRolesServiceResponse = Either<
  PaginationError | UserNonExistsError | PermissionError | InactiveUserError,
  RoleQueryResponse
>

export class GetAllRolesService {
  constructor(
    private roleRepository: RoleRepository,
    private authorizationService: AuthorizationService,
  ) {}

  async execute({
    page,
    limit,
  }: GetAllRolesServiceRequest): Promise<GetAllRolesServiceResponse> {
    const authorizationVerify = await this.authorizationService.execute({
      necessaryRole: Permission.ROLE_GET,
    })

    if (authorizationVerify.isLeft()) {
      return left(authorizationVerify.value)
    }

    if (page <= 0 || limit <= 0) {
      return left(new PaginationError())
    }

    return right(await this.roleRepository.getAllRoles(page, limit))
  }
}
