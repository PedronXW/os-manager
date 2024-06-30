import { Either, left, right } from '@/@shared/either'
import { Product } from '@/domain/enterprise/entities/product/product'
import { InactiveUserError } from '../../errors/inactive-user-error'
import { PermissionError } from '../../errors/permission-error'
import { ProductNonExistsError } from '../../errors/product-non-exists-error'
import { UserNonExistsError } from '../../errors/user-non-exists-error'
import { Permission } from '../../permissions/permissions'
import { ProductRepository } from '../../repositories/product-repository'
import { AuthorizationService } from '../authorization/authorization-service'

type GetProductByIdServiceRequest = {
  id: string
}

type GetProductByIdServiceResponse = Either<
  | ProductNonExistsError
  | UserNonExistsError
  | PermissionError
  | InactiveUserError,
  Product | undefined
>

export class GetProductByIdService {
  constructor(
    private productRepository: ProductRepository,
    private authorizationService: AuthorizationService,
  ) {}

  async execute({
    id,
  }: GetProductByIdServiceRequest): Promise<GetProductByIdServiceResponse> {
    const authorizationVerify = await this.authorizationService.execute({
      necessaryRole: Permission.PRODUCT_GET,
    })

    if (authorizationVerify.isLeft()) {
      return left(authorizationVerify.value)
    }

    const product = await this.productRepository.getProductById(id)

    if (!product) {
      return left(new ProductNonExistsError())
    }

    return right(product)
  }
}
