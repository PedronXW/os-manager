import { Either, left, right } from '@/@shared/either'
import { InactiveUserError } from '../../errors/inactive-user-error'
import { PaginationError } from '../../errors/pagination-error'
import { PermissionError } from '../../errors/permission-error'
import { UserNonExistsError } from '../../errors/user-non-exists-error'
import { Permission } from '../../permissions/permissions'
import {
  ClientQueryResponse,
  ClientRepository,
} from '../../repositories/client-repository'
import { AuthorizationService } from '../authorization/authorization-service'

type GetAllClientsServiceRequest = {
  page: number
  limit: number
}

type GetAllClientsServiceResponse = Either<
  PaginationError | UserNonExistsError | PermissionError | InactiveUserError,
  ClientQueryResponse
>

export class GetAllClientsService {
  constructor(
    private clientRepository: ClientRepository,
    private authorizationService: AuthorizationService,
  ) {}

  async execute({
    page,
    limit,
  }: GetAllClientsServiceRequest): Promise<GetAllClientsServiceResponse> {
    const authorizationVerify = await this.authorizationService.execute({
      necessaryRole: Permission.CLIENT_GET,
    })

    if (authorizationVerify.isLeft()) {
      return left(authorizationVerify.value)
    }

    if (page <= 0 || limit <= 0) {
      return left(new PaginationError())
    }

    return right(await this.clientRepository.getAllClients(page, limit))
  }
}
