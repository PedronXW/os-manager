import { makeProduct } from 'test/factories/unit/product-factory'
import { makeUser } from 'test/factories/unit/user-factory'
import { InMemoryProductRepository } from 'test/repositories/InMemoryProductRepository'
import { InMemoryUserRepository } from 'test/repositories/InMemoryUserRepository'
import { Permission } from '../../permissions/permissions'
import { UserRepository } from '../../repositories/user-repository'
import { AuthorizationService } from '../authorization/authorization-service'
import { UpdateProductService } from './update-product'

describe('UpdateProduct', () => {
  let sut: UpdateProductService
  let productRepository: InMemoryProductRepository
  let authorizationService: AuthorizationService
  let userRepository: UserRepository

  beforeEach(async () => {
    productRepository = new InMemoryProductRepository()
    userRepository = new InMemoryUserRepository()
    const user = await userRepository.createUser(
      makeUser({
        permissions: [Permission.PRODUCT_UPDATE],
      }),
    )
    authorizationService = new AuthorizationService(
      userRepository,
      user.id.getValue(),
    )
    sut = new UpdateProductService(productRepository, authorizationService)
  })

  it('should be able to update a product', async () => {
    const product = await makeProduct()

    productRepository.createProduct(product)

    const response = await sut.execute({
      id: product.id.getValue(),
      description: 'arroz-doce',
    })

    expect(response.isRight()).toBeTruthy()
    expect(productRepository.products).toHaveLength(1)
    expect(productRepository.products[0].description).toEqual('arroz-doce')
  })
})
