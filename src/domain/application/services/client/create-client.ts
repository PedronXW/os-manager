import { Either, left, right } from '@/@shared/either'
import { EntityId } from '@/@shared/entities/entity-id'
import { Client } from '@/domain/enterprise/entities/client/client'
import { ClientAlreadyExistsError } from '../../errors/client-already-exists-error'
import { InactiveUserError } from '../../errors/inactive-user-error'
import { PermissionError } from '../../errors/permission-error'
import { UserNonExistsError } from '../../errors/user-non-exists-error'
import { Permission } from '../../permissions/permissions'
import { ClientRepository } from '../../repositories/client-repository'
import { AuthorizationService } from '../authorization/authorization-service'

type CreateClientServiceRequest = {
  name: string
  email: string
  managerName: string
  document: string
  contacts: string[]
  creatorId: string
}

type CreateClientServiceResponse = Either<
  | ClientAlreadyExistsError
  | UserNonExistsError
  | PermissionError
  | InactiveUserError,
  Client
>

export class CreateClientService {
  constructor(
    private clientRepository: ClientRepository,
    private authorizationService: AuthorizationService,
  ) {}

  async execute({
    name,
    email,
    managerName,
    document,
    contacts,
    creatorId,
  }: CreateClientServiceRequest): Promise<CreateClientServiceResponse> {
    const authorizationVerify = await this.authorizationService.execute({
      necessaryRole: Permission.CLIENT_CREATE,
    })

    if (authorizationVerify.isLeft()) {
      return left(authorizationVerify.value)
    }

    const clientExists =
      await this.clientRepository.getClientByExactlyDocument(document)

    if (clientExists) {
      return left(new ClientAlreadyExistsError())
    }

    const client = Client.create({
      name,
      email,
      managerName,
      document,
      contacts,
      createdBy: new EntityId(creatorId),
    })

    return right(await this.clientRepository.createClient(client))
  }
}
