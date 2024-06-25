import { Either, right } from '@/@shared/either'
import { ProductRepository } from '../../repositories/product-repository'

type DeleteProductServiceRequest = {
  id: string
}

type DeleteProductServiceResponse = Either<void, void>

export class DeleteProductService {
  constructor(private productRepository: ProductRepository) {}

  async execute({
    id,
  }: DeleteProductServiceRequest): Promise<DeleteProductServiceResponse> {
    return right(await this.productRepository.deleteProduct(id))
  }
}
