import { makeProduct } from 'test/factories/unit/product-factory'
import { InMemoryProductRepository } from 'test/repositories/InMemoryProductRepository'
import { UpdateProductService } from './update-product'

describe('UpdateProduct', () => {
  let sut: UpdateProductService
  let productRepository: InMemoryProductRepository

  beforeEach(() => {
    productRepository = new InMemoryProductRepository()
    sut = new UpdateProductService(productRepository)
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
