import { Either, left, right } from '@/@shared/either'
import { PaginationError } from '../../errors/pagination-error'
import {
  ClientQueryResponse,
  ClientRepository,
} from '../../repositories/client-repository'

type GetAllClientsServiceRequest = {
  page: number
  limit: number
}

type GetAllClientsServiceResponse = Either<PaginationError, ClientQueryResponse>

export class GetAllClientsService {
  constructor(private clientRepository: ClientRepository) {}

  async execute({
    page,
    limit,
  }: GetAllClientsServiceRequest): Promise<GetAllClientsServiceResponse> {
    if (page <= 0 || limit <= 0) {
      return left(new PaginationError())
    }

    return right(await this.clientRepository.getAllClients(page, limit))
  }
}
