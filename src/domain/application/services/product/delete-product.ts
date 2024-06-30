import { Either, left, right } from '@/@shared/either'
import { InactiveUserError } from '../../errors/inactive-user-error'
import { PermissionError } from '../../errors/permission-error'
import { UserNonExistsError } from '../../errors/user-non-exists-error'
import { Permission } from '../../permissions/permissions'
import { ProductRepository } from '../../repositories/product-repository'
import { AuthorizationService } from '../authorization/authorization-service'

type DeleteProductServiceRequest = {
  id: string
}

type DeleteProductServiceResponse = Either<
  UserNonExistsError | PermissionError | InactiveUserError,
  void
>

export class DeleteProductService {
  constructor(
    private productRepository: ProductRepository,
    private authorizationService: AuthorizationService,
  ) {}

  async execute({
    id,
  }: DeleteProductServiceRequest): Promise<DeleteProductServiceResponse> {
    const authorizationVerify = await this.authorizationService.execute({
      necessaryRole: Permission.PRODUCT_DELETE,
    })

    if (authorizationVerify.isLeft()) {
      return left(authorizationVerify.value)
    }

    return right(await this.productRepository.deleteProduct(id))
  }
}
