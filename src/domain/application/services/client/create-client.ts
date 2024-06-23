import { Either, left, right } from '@/@shared/either'
import { EntityId } from '@/@shared/entities/entity-id'
import { Client } from '@/domain/enterprise/entities/client/client'
import { ClientRepository } from '../../repositories/client-repository'

type CreateClientRequest = {
  name: string
  email: string
  managerName: string
  document: string
  contacts: string[]
  creatorId: string
}

type CreateClientResponse = Either<Error, Client>

export class CreateClient {
  constructor(private clientRepository: ClientRepository) {}

  async execute({
    name,
    email,
    managerName,
    document,
    contacts,
    creatorId,
  }: CreateClientRequest): Promise<CreateClientResponse> {
    const clientExists =
      await this.clientRepository.getClientByDocument(document)

    if (clientExists) {
      return left(new Error('Client already exists'))
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
