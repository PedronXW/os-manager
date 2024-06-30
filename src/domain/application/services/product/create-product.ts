import { Either, left, right } from '@/@shared/either'
import { EntityId } from '@/@shared/entities/entity-id'
import { Product } from '@/domain/enterprise/entities/product/product'
import { InactiveUserError } from '../../errors/inactive-user-error'
import { PermissionError } from '../../errors/permission-error'
import { UserNonExistsError } from '../../errors/user-non-exists-error'
import { Permission } from '../../permissions/permissions'
import { ProductRepository } from '../../repositories/product-repository'
import { AuthorizationService } from '../authorization/authorization-service'

type CreateProductServiceRequest = {
  name: string
  description: string
  code: string
  fabricator: string
  price: number
  creatorId: string
}

type CreateProductServiceResponse = Either<
  UserNonExistsError | PermissionError | InactiveUserError,
  Product
>

export class CreateProductService {
  constructor(
    private productRepository: ProductRepository,
    private authorizationService: AuthorizationService,
  ) {}

  async execute({
    name,
    description,
    code,
    fabricator,
    price,
    creatorId,
  }: CreateProductServiceRequest): Promise<CreateProductServiceResponse> {
    const authorizationVerify = await this.authorizationService.execute({
      necessaryRole: Permission.PRODUCT_CREATE,
    })

    if (authorizationVerify.isLeft()) {
      return left(authorizationVerify.value)
    }

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
