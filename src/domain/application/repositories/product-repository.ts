import { Product } from '@/domain/enterprise/entities/product/product';

export abstract class ProductRepository {
  abstract createProduct(product: Product): Promise<Product>
  abstract updateProduct(id: string, newProduct: Product): Promise<Product>
  abstract deleteProduct(id: string): Promise<void>
  abstract getAllProducts(page: number, limit: number): Promise<Product[]>
  abstract getProductById(id: string): Promise<Product>
}
