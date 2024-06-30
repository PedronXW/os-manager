import { Product } from '@/domain/enterprise/entities/product/product'
import { makeProduct } from 'test/factories/unit/product-factory'
import { makeUser } from 'test/factories/unit/user-factory'
import { InMemoryProductRepository } from 'test/repositories/InMemoryProductRepository'
import { InMemoryUserRepository } from 'test/repositories/InMemoryUserRepository'
import { Permission } from '../../permissions/permissions'
import { UserRepository } from '../../repositories/user-repository'
import { AuthorizationService } from '../authorization/authorization-service'
import { GetProductByIdService } from './get-product-by-id'

describe('GetProductById', () => {
  let sut: GetProductByIdService
  let productRepository: InMemoryProductRepository
  let authorizationService: AuthorizationService
  let userRepository: UserRepository

  beforeEach(async () => {
    productRepository = new InMemoryProductRepository()
    userRepository = new InMemoryUserRepository()
    const user = await userRepository.createUser(
      makeUser({
        permissions: [Permission.PRODUCT_GET],
      }),
    )
    authorizationService = new AuthorizationService(
      userRepository,
      user.id.getValue(),
    )
    sut = new GetProductByIdService(productRepository, authorizationService)
  })

  it('should be able to get a product by id', async () => {
    const product = await makeProduct()

    productRepository.createProduct(product)

    const response = await sut.execute({
      id: product.id.getValue(),
    })

    expect(response.isRight()).toBeTruthy()
    expect(response.value).toEqual(expect.any(Product))
    expect(productRepository.products).toHaveLength(1)
  })
})
