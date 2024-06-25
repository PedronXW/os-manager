import { Product } from '@/domain/enterprise/entities/product/product'
import { makeProduct } from 'test/factories/unit/product-factory'
import { InMemoryProductRepository } from 'test/repositories/InMemoryProductRepository'
import { GetProductByIdService } from './get-product-by-id'

describe('GetProductById', () => {
  let sut: GetProductByIdService
  let productRepository: InMemoryProductRepository

  beforeEach(() => {
    productRepository = new InMemoryProductRepository()
    sut = new GetProductByIdService(productRepository)
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
