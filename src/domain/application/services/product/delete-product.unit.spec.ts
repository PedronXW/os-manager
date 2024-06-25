import { makeProduct } from 'test/factories/unit/product-factory'
import { InMemoryProductRepository } from 'test/repositories/InMemoryProductRepository'
import { DeleteProductService } from './delete-product'

describe('DeleteProduct', () => {
  let sut: DeleteProductService
  let productRepository: InMemoryProductRepository

  beforeEach(() => {
    productRepository = new InMemoryProductRepository()
    sut = new DeleteProductService(productRepository)
  })

  it('should be able to delete a product', async () => {
    const product = await makeProduct()

    productRepository.createProduct(product)

    const response = await sut.execute({
      id: product.id.getValue(),
    })

    expect(response.isRight()).toBeTruthy()
    expect(productRepository.products).toHaveLength(0)
  })
})
