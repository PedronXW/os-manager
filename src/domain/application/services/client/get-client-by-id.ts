import { Either, left, right } from '@/@shared/either'
import { Client } from '@/domain/enterprise/entities/client/client'
import { ClientNonExistsError } from '../../errors/client-non-exists-error'
import { ClientRepository } from '../../repositories/client-repository'

type GetClientByIdServiceRequest = {
  id: string
}

type GetClientByIdServiceResponse = Either<
  ClientNonExistsError,
  Client | undefined
>

export class GetClientByIdService {
  constructor(private clientRepository: ClientRepository) {}

  async execute({
    id,
  }: GetClientByIdServiceRequest): Promise<GetClientByIdServiceResponse> {
    const client = await this.clientRepository.getClientById(id)

    if (!client) {
      return left(new ClientNonExistsError())
    }

    return right(client)
  }
}
