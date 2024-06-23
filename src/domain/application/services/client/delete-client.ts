import { Either, left, right } from '@/@shared/either'
import { ClientNonExistsError } from '../../errors/client-non-exists-error'
import { ClientRepository } from '../../repositories/client-repository'

type DeleteClientServiceRequest = {
  id: string
}

type DeleteClientServiceResponse = Either<ClientNonExistsError, void>

export class DeleteClientService {
  constructor(private clientRepository: ClientRepository) {}

  async execute({
    id,
  }: DeleteClientServiceRequest): Promise<DeleteClientServiceResponse> {
    const clientExists = await this.clientRepository.getClientById(id)

    if (!clientExists) {
      return left(new ClientNonExistsError())
    }

    return right(await this.clientRepository.deleteClient(id))
  }
}
