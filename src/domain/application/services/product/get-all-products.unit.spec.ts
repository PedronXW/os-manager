import { makeProduct } from 'test/factories/unit/product-factory'
import { InMemoryProductRepository } from 'test/repositories/InMemoryProductRepository'
import { GetAllProductsService } from './get-all-products'

describe('GetAllProduct', () => {
  let sut: GetAllProductsService
  let productRepository: InMemoryProductRepository

  beforeEach(() => {
    productRepository = new InMemoryProductRepository()
    sut = new GetAllProductsService(productRepository)
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
