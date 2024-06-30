import { Product } from '@/domain/enterprise/entities/product/product'
import { makeUser } from 'test/factories/unit/user-factory'
import { InMemoryProductRepository } from 'test/repositories/InMemoryProductRepository'
import { InMemoryUserRepository } from 'test/repositories/InMemoryUserRepository'
import { Permission } from '../../permissions/permissions'
import { UserRepository } from '../../repositories/user-repository'
import { AuthorizationService } from '../authorization/authorization-service'
import { CreateProductService } from './create-product'

describe('CreateProduct', () => {
  let sut: CreateProductService
  let productRepository: InMemoryProductRepository
  let authorizationService: AuthorizationService
  let userRepository: UserRepository

  beforeEach(async () => {
    productRepository = new InMemoryProductRepository()
    userRepository = new InMemoryUserRepository()
    const user = await userRepository.createUser(
      makeUser({
        permissions: [Permission.PRODUCT_CREATE],
      }),
    )
    authorizationService = new AuthorizationService(
      userRepository,
      user.id.getValue(),
    )
    sut = new CreateProductService(productRepository, authorizationService)
  })

  it('should be able to create a product', async () => {
    const response = await sut.execute({
      name: 'Product Name',
      code: 'a',
      fabricator: 'a',
      price: 12,
      description: 'arroz',
      creatorId: 'creatorId',
    })

    expect(response.isRight()).toBeTruthy()
    expect(response.value).toEqual(expect.any(Product))
    expect(productRepository.products).toHaveLength(1)
  })
})
