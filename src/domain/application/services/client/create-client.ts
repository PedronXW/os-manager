import { Either, left, right } from '@/@shared/either'
import { EntityId } from '@/@shared/entities/entity-id'
import { Client } from '@/domain/enterprise/entities/client/client'
import { ClientAlreadyExistsError } from '../../errors/client-already-exists-error'
import { ClientRepository } from '../../repositories/client-repository'

type CreateClientServiceRequest = {
  name: string
  email: string
  managerName: string
  document: string
  contacts: string[]
  creatorId: string
}

type CreateClientServiceResponse = Either<ClientAlreadyExistsError, Client>

export class CreateClientService {
  constructor(private clientRepository: ClientRepository) {}

  async execute({
    name,
    email,
    managerName,
    document,
    contacts,
    creatorId,
  }: CreateClientServiceRequest): Promise<CreateClientServiceResponse> {
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
