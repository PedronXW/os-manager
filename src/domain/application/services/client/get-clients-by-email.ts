import { Either, left, right } from '@/@shared/either'
import { PaginationError } from '../../errors/pagination-error'
import {
  ClientQueryResponse,
  ClientRepository,
} from '../../repositories/client-repository'

type GetClientsByEmailServiceRequest = {
  email: string
  page: number
  limit: number
}

type GetClientsByEmailServiceResponse = Either<
  PaginationError,
  ClientQueryResponse
>

export class GetClientsByEmailService {
  constructor(private clientRepository: ClientRepository) {}

  async execute({
    email,
    page,
    limit,
  }: GetClientsByEmailServiceRequest): Promise<GetClientsByEmailServiceResponse> {
    if (page <= 0 || limit <= 0) {
      return left(new PaginationError())
    }

    return right(
      await this.clientRepository.getClientByEmail(email, page, limit),
    )
  }
}
