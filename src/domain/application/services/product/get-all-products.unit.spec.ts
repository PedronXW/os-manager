import { makeProduct } from 'test/factories/unit/product-factory'
import { makeUser } from 'test/factories/unit/user-factory'
import { InMemoryProductRepository } from 'test/repositories/InMemoryProductRepository'
import { InMemoryUserRepository } from 'test/repositories/InMemoryUserRepository'
import { Permission } from '../../permissions/permissions'
import { UserRepository } from '../../repositories/user-repository'
import { AuthorizationService } from '../authorization/authorization-service'
import { GetAllProductsService } from './get-all-products'

describe('GetAllProduct', () => {
  let sut: GetAllProductsService
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
    sut = new GetAllProductsService(productRepository, authorizationService)
  })

  it('should be able to get all products', async () => {
    const product = await makeProduct()

    productRepository.createProduct(product)

    const response = await sut.execute({
      page: 1,
      limit: 10,
    })

    expect(response.isRight()).toBeTruthy()
    expect(response.value).toEqual({
      products: expect.any(Array),
      productsQueryCount: 1,
    })
    expect(productRepository.products).toHaveLength(1)
  })
})
