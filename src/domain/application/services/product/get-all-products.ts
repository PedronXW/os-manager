import { Either, left, right } from '@/@shared/either'
import { PaginationError } from '../../errors/pagination-error'
import {
  ProductQueryResponse,
  ProductRepository,
} from '../../repositories/product-repository'

type GetAllProductsServiceRequest = {
  page: number
  limit: number
}

type GetAllProductsServiceResponse = Either<
  PaginationError,
  ProductQueryResponse
>

export class GetAllProductsService {
  constructor(private productRepository: ProductRepository) {}

  async execute({
    page,
    limit,
  }: GetAllProductsServiceRequest): Promise<GetAllProductsServiceResponse> {
    if (page <= 0 || limit <= 0) {
      return left(new PaginationError())
    }

    return right(await this.productRepository.getAllProducts(page, limit))
  }
}
