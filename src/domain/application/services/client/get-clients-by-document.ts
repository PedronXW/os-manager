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

type GetClientsByDocumentServiceRequest = {
  document: string
  page: number
  limit: number
}

type GetClientsByDocumentServiceResponse = Either<
  PaginationError | UserNonExistsError | PermissionError | InactiveUserError,
  ClientQueryResponse
>

export class GetClientsByDocumentService {
  constructor(
    private clientRepository: ClientRepository,
    private authorizationService: AuthorizationService,
  ) {}

  async execute({
    document,
    page,
    limit,
  }: GetClientsByDocumentServiceRequest): Promise<GetClientsByDocumentServiceResponse> {
    const authorizationVerify = await this.authorizationService.execute({
      necessaryRole: Permission.CLIENT_GET,
    })

    if (authorizationVerify.isLeft()) {
      return left(authorizationVerify.value)
    }

    if (page <= 0 || limit <= 0) {
      return left(new PaginationError())
    }

    return right(
      await this.clientRepository.getClientByDocument(document, page, limit),
    )
  }
}
