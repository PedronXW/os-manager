import { Either, left, right } from '@/@shared/either'
import { PaginationError } from '../../errors/pagination-error'
import {
  ClientQueryResponse,
  ClientRepository,
} from '../../repositories/client-repository'

type GetClientsByDocumentServiceRequest = {
  document: string
  page: number
  limit: number
}

type GetClientsByDocumentServiceResponse = Either<
  PaginationError,
  ClientQueryResponse
>

export class GetClientsByDocumentService {
  constructor(private clientRepository: ClientRepository) {}

  async execute({
    document,
    page,
    limit,
  }: GetClientsByDocumentServiceRequest): Promise<GetClientsByDocumentServiceResponse> {
    if (page <= 0 || limit <= 0) {
      return left(new PaginationError())
    }

    return right(
      await this.clientRepository.getClientByDocument(document, page, limit),
    )
  }
}
