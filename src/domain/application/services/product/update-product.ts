import { Either, left, right } from '@/@shared/either'
import { Product } from '@/domain/enterprise/entities/product/product'
import { ProductNonExistsError } from '../../errors/product-non-exists-error'
import { ProductRepository } from '../../repositories/product-repository'

type UpdateProductServiceRequest = {
  id: string
  name?: string
  code?: string
  fabricator?: string
  price?: number
  description?: string
}

type UpdateProductServiceResponse = Either<ProductNonExistsError, Product>

export class UpdateProductService {
  constructor(private productRepository: ProductRepository) {}

  async execute({
    id,
    name,
    code,
    fabricator,
    price,
    description,
  }: UpdateProductServiceRequest): Promise<UpdateProductServiceResponse> {
    const productExists = await this.productRepository.getProductById(id)

    if (!productExists) {
      return left(new ProductNonExistsError())
    }

    productExists.name = name ?? productExists.name
    productExists.description = description ?? productExists.description
    productExists.code = code ?? productExists.code
    productExists.fabricator = fabricator ?? productExists.fabricator
    productExists.price = price ?? productExists.price

    return right(await this.productRepository.updateProduct(id, productExists))
  }
}
