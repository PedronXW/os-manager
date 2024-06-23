import { Either, left, right } from '@/@shared/either'
import { PaginationError } from '../../errors/pagination-error'
import {
  ClientQueryResponse,
  ClientRepository,
} from '../../repositories/client-repository'

type GetClientsByNameServiceRequest = {
  name: string
  page: number
  limit: number
}

type GetClientsByNameServiceResponse = Either<
  PaginationError,
  ClientQueryResponse
>

export class GetClientsByNameService {
  constructor(private clientRepository: ClientRepository) {}

  async execute({
    name,
    page,
    limit,
  }: GetClientsByNameServiceRequest): Promise<GetClientsByNameServiceResponse> {
    if (page <= 0 || limit <= 0) {
      return left(new PaginationError())
    }
    return right(await this.clientRepository.getClientByName(name, page, limit))
  }
}
