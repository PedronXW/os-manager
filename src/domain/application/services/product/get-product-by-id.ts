import { Either, left, right } from '@/@shared/either'
import { Product } from '@/domain/enterprise/entities/product/product'
import { ProductNonExistsError } from '../../errors/product-non-exists-error'
import { ProductRepository } from '../../repositories/product-repository'

type GetProductByIdServiceRequest = {
  id: string
}

type GetProductByIdServiceResponse = Either<
  ProductNonExistsError,
  Product | undefined
>

export class GetProductByIdService {
  constructor(private productRepository: ProductRepository) {}

  async execute({
    id,
  }: GetProductByIdServiceRequest): Promise<GetProductByIdServiceResponse> {
    const product = await this.productRepository.getProductById(id)

    if (!product) {
      return left(new ProductNonExistsError())
    }

    return right(product)
  }
}
