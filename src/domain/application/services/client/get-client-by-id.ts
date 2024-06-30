import { Either, left, right } from '@/@shared/either'
import { Client } from '@/domain/enterprise/entities/client/client'
import { ClientNonExistsError } from '../../errors/client-non-exists-error'
import { InactiveUserError } from '../../errors/inactive-user-error'
import { PermissionError } from '../../errors/permission-error'
import { UserNonExistsError } from '../../errors/user-non-exists-error'
import { Permission } from '../../permissions/permissions'
import { ClientRepository } from '../../repositories/client-repository'
import { AuthorizationService } from '../authorization/authorization-service'

type GetClientByIdServiceRequest = {
  id: string
}

type GetClientByIdServiceResponse = Either<
  | ClientNonExistsError
  | UserNonExistsError
  | PermissionError
  | InactiveUserError,
  Client | undefined
>

export class GetClientByIdService {
  constructor(
    private clientRepository: ClientRepository,
    private authorizationService: AuthorizationService,
  ) {}

  async execute({
    id,
  }: GetClientByIdServiceRequest): Promise<GetClientByIdServiceResponse> {
    const authorizationVerify = await this.authorizationService.execute({
      necessaryRole: Permission.CLIENT_GET,
    })

    if (authorizationVerify.isLeft()) {
      return left(authorizationVerify.value)
    }

    const client = await this.clientRepository.getClientById(id)

    if (!client) {
      return left(new ClientNonExistsError())
    }

    return right(client)
  }
}
