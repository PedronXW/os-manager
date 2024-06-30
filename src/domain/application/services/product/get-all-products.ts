import { Either, left, right } from '@/@shared/either'
import { InactiveUserError } from '../../errors/inactive-user-error'
import { PaginationError } from '../../errors/pagination-error'
import { PermissionError } from '../../errors/permission-error'
import { UserNonExistsError } from '../../errors/user-non-exists-error'
import { Permission } from '../../permissions/permissions'
import {
  ProductQueryResponse,
  ProductRepository,
} from '../../repositories/product-repository'
import { AuthorizationService } from '../authorization/authorization-service'

type GetAllProductsServiceRequest = {
  page: number
  limit: number
}

type GetAllProductsServiceResponse = Either<
  PaginationError | UserNonExistsError | PermissionError | InactiveUserError,
  ProductQueryResponse
>

export class GetAllProductsService {
  constructor(
    private productRepository: ProductRepository,
    private authorizationService: AuthorizationService,
  ) {}

  async execute({
    page,
    limit,
  }: GetAllProductsServiceRequest): Promise<GetAllProductsServiceResponse> {
    const authorizationVerify = await this.authorizationService.execute({
      necessaryRole: Permission.PRODUCT_GET,
    })

    if (authorizationVerify.isLeft()) {
      return left(authorizationVerify.value)
    }

    if (page <= 0 || limit <= 0) {
      return left(new PaginationError())
    }

    return right(await this.productRepository.getAllProducts(page, limit))
  }
}
