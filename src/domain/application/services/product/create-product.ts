import { Either, right } from '@/@shared/either'
import { EntityId } from '@/@shared/entities/entity-id'
import { Product } from '@/domain/enterprise/entities/product/product'
import { ClientNonExistsError } from '../../errors/client-non-exists-error'
import { InactiveClientError } from '../../errors/inactive-client-error'
import { ProductRepository } from '../../repositories/product-repository'

type CreateProductServiceRequest = {
  name: string
  description: string
  code: string
  fabricator: string
  price: number
  creatorId: string
}

type CreateProductServiceResponse = Either<
  ClientNonExistsError | InactiveClientError,
  Product
>

export class CreateProductService {
  constructor(private productRepository: ProductRepository) {}

  async execute({
    name,
    description,
    code,
    fabricator,
    price,
    creatorId,
  }: CreateProductServiceRequest): Promise<CreateProductServiceResponse> {
    const product = Product.create({
      name,
      description,
      code,
      fabricator,
      price,
      createdBy: new EntityId(creatorId),
    })

    return right(await this.productRepository.createProduct(product))
  }
}
