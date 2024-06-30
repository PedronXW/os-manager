import { Either, left, right } from '@/@shared/either'
import { Client } from '@/domain/enterprise/entities/client/client'
import { ClientNonExistsError } from '../../errors/client-non-exists-error'
import { InactiveUserError } from '../../errors/inactive-user-error'
import { PermissionError } from '../../errors/permission-error'
import { UserNonExistsError } from '../../errors/user-non-exists-error'
import { Permission } from '../../permissions/permissions'
import { ClientRepository } from '../../repositories/client-repository'
import { AuthorizationService } from '../authorization/authorization-service'

type UpdateClientServiceRequest = {
  id: string
  name?: string
  email?: string
  managerName?: string
  document?: string
  contacts?: string[]
}

type UpdateClientServiceResponse = Either<
  | ClientNonExistsError
  | UserNonExistsError
  | PermissionError
  | InactiveUserError,
  Client
>

export class UpdateClientService {
  constructor(
    private clientRepository: ClientRepository,
    private authorizationService: AuthorizationService,
  ) {}

  async execute({
    id,
    name,
    managerName,
    email,
    document,
    contacts,
  }: UpdateClientServiceRequest): Promise<UpdateClientServiceResponse> {
    const authorizationVerify = await this.authorizationService.execute({
      necessaryRole: Permission.CLIENT_UPDATE,
    })

    if (authorizationVerify.isLeft()) {
      return left(authorizationVerify.value)
    }

    const clientExists = await this.clientRepository.getClientById(id)

    if (!clientExists) {
      return left(new ClientNonExistsError())
    }

    clientExists.name = name ?? clientExists.name
    clientExists.managerName = managerName ?? clientExists.managerName
    clientExists.email = email ?? clientExists.email
    clientExists.document = document ?? clientExists.document
    clientExists.contacts = contacts ?? clientExists.contacts

    return right(await this.clientRepository.updateClient(id, clientExists))
  }
}
