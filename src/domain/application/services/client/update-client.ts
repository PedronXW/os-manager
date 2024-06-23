import { Either, left, right } from '@/@shared/either'
import { Client } from '@/domain/enterprise/entities/client/client'
import { ClientNonExistsError } from '../../errors/client-non-exists-error'
import { ClientRepository } from '../../repositories/client-repository'

type UpdateClientServiceRequest = {
  id: string
  name?: string
  email?: string
  managerName?: string
  document?: string
  contacts?: string[]
}

type UpdateClientServiceResponse = Either<ClientNonExistsError, Client>

export class UpdateClientService {
  constructor(private clientRepository: ClientRepository) {}

  async execute({
    id,
    name,
    managerName,
    email,
    document,
    contacts,
  }: UpdateClientServiceRequest): Promise<UpdateClientServiceResponse> {
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
