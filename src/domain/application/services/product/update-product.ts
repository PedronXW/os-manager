import { Either, left, right } from '@/@shared/either'
import { Product } from '@/domain/enterprise/entities/product/product'
import { InactiveUserError } from '../../errors/inactive-user-error'
import { PermissionError } from '../../errors/permission-error'
import { ProductNonExistsError } from '../../errors/product-non-exists-error'
import { UserNonExistsError } from '../../errors/user-non-exists-error'
import { Permission } from '../../permissions/permissions'
import { ProductRepository } from '../../repositories/product-repository'
import { AuthorizationService } from '../authorization/authorization-service'

type UpdateProductServiceRequest = {
  id: string
  name?: string
  code?: string
  fabricator?: string
  price?: number
  description?: string
}

type UpdateProductServiceResponse = Either<
  | ProductNonExistsError
  | UserNonExistsError
  | PermissionError
  | InactiveUserError,
  Product
>

export class UpdateProductService {
  constructor(
    private productRepository: ProductRepository,
    private authorizationService: AuthorizationService,
  ) {}

  async execute({
    id,
    name,
    code,
    fabricator,
    price,
    description,
  }: UpdateProductServiceRequest): Promise<UpdateProductServiceResponse> {
    const authorizationVerify = await this.authorizationService.execute({
      necessaryRole: Permission.PRODUCT_UPDATE,
    })

    if (authorizationVerify.isLeft()) {
      return left(authorizationVerify.value)
    }

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
