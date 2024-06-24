import { DomainEvents } from '@/@shared/events/event-dispatcher'
import {
    ProductQueryResponse,
    ProductRepository,
} from '@/domain/application/repositories/product-repository'
import { Product } from '@/domain/enterprise/entities/product/product'

export class InMemoryProductRepository implements ProductRepository {
  public products: Product[] = []

  async createProduct(product: Product): Promise<Product> {
    this.products.push(product)

    DomainEvents.markEntityForDispatch(product)

    DomainEvents.dispatchEventsForEntity(product.id)

    return product
  }

  async updateProduct(id: string, newProduct: Product): Promise<Product> {
    const productIndex = this.products.findIndex(
      (product) => product.id.getValue() === id,
    )

    this.products[productIndex] = newProduct

    return newProduct
  }

  async deleteProduct(id: string): Promise<void> {
    this.products = this.products.filter(
      (product) => product.id.getValue() !== id,
    )
  }

  async getAllProducts(
    page: number,
    limit: number,
  ): Promise<ProductQueryResponse> {
    const startIndex = (page - 1) * limit

    const endIndex = page * limit

    return {
      products: this.products.slice(startIndex, endIndex),
      productsQueryCount: this.products.length,
    }
  }

  async getProductById(id: string): Promise<Product | undefined> {
    return this.products.find((product) => product.id.getValue() === id)
  }
}
