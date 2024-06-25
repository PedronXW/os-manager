import { Product } from '@/domain/enterprise/entities/product/product'
import { InMemoryProductRepository } from 'test/repositories/InMemoryProductRepository'
import { CreateProductService } from './create-product'

describe('CreateProduct', () => {
  let sut: CreateProductService
  let productRepository: InMemoryProductRepository

  beforeEach(() => {
    productRepository = new InMemoryProductRepository()
    sut = new CreateProductService(productRepository)
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
