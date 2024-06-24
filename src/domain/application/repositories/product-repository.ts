import { Product } from '@/domain/enterprise/entities/product/product'

export type ProductQueryResponse = {
  products: Product[]
  productsQueryCount: number
}

export abstract class ProductRepository {
  abstract createProduct(product: Product): Promise<Product>
  abstract updateProduct(id: string, newProduct: Product): Promise<Product>
  abstract deleteProduct(id: string): Promise<void>
  abstract getAllProducts(
    page: number,
    limit: number,
  ): Promise<ProductQueryResponse>

  abstract getProductById(id: string): Promise<Product | undefined>
}
